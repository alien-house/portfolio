import os
import re
from pathlib import Path
from typing import Any, Optional

import google.generativeai as genai
import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from youtube_transcript_api import YouTubeTranscriptApi

# youtube_summary/.env（main.py と同じディレクトリ）。ファイルが無くてもよい。
load_dotenv(Path(__file__).resolve().parent / ".env")

app = FastAPI()

_origins_raw = os.getenv("ALLOW_ORIGINS", "*").strip()
if _origins_raw == "*":
    _allow_origins = ["*"]
else:
    _allow_origins = [o.strip() for o in _origins_raw.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_allow_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")


def extract_video_id(url: str) -> Optional[str]:
    pattern = r"(?:v=|\/)([0-9A-Za-z_-]{11}).*"
    match = re.search(pattern, url)
    return match.group(1) if match else None


@app.get("/summarize")
async def summarize(url: str):
    if not GEMINI_API_KEY:
        raise HTTPException(
            status_code=503,
            detail="GEMINI_API_KEY is not configured on the server",
        )
    video_id = extract_video_id(url)
    if not video_id:
        raise HTTPException(status_code=400, detail="URLが正しくありません")

    try:
        transcript_list = YouTubeTranscriptApi.get_transcript(
            video_id, languages=["ja", "en"]
        )
        full_text = " ".join([t["text"] for t in transcript_list])

        prompt = f"""
        以下のYouTube動画の字幕データから、重要な内容を3つのポイントで要約してください。

        【制約条件】
        ・各ポイントは2行以内。
        ・専門用語は分かりやすく。
        ・日本語で出力。

        字幕データ:
        {full_text[:8000]}
        """

        response = model.generate_content(prompt)
        summary_text = response.text

        return {"video_id": video_id, "summary": summary_text}

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(
            status_code=500,
            detail="要約の生成に失敗しました。字幕が無効な可能性があります。",
        )


def _nested_get(obj: Any, path: str) -> Any:
    cur: Any = obj
    for part in path.split("."):
        if cur is None or not isinstance(cur, dict):
            return None
        cur = cur.get(part)
    return cur


class YouTubeDifyBody(BaseModel):
    url: str = Field(..., min_length=8, description="YouTube watch or youtu.be URL")


@app.post("/api/portfolio/youtube-dify-summary")
async def portfolio_youtube_dify_summary(body: YouTubeDifyBody):
    """
    Browser calls this with {url} only. DIFY_API_KEY and DIFY_WORKFLOW_URL
    live in server environment — never ship them to the client.
    """
    key = os.getenv("DIFY_API_KEY", "").strip()
    workflow_url = os.getenv("DIFY_WORKFLOW_URL", "").strip()
    if not key or not workflow_url:
        raise HTTPException(
            status_code=503,
            detail="Dify proxy is not configured (DIFY_API_KEY / DIFY_WORKFLOW_URL).",
        )

    input_field = os.getenv("DIFY_INPUT_FIELD", "youtube_url").strip() or "youtube_url"
    output_field = os.getenv("DIFY_OUTPUT_FIELD", "text").strip() or "text"

    payload = {
        "inputs": {input_field: body.url},
        "response_mode": "blocking",
        "user": "portfolio-visitor",
    }

    try:
        async with httpx.AsyncClient(timeout=httpx.Timeout(120.0)) as client:
            r = await client.post(
                workflow_url,
                headers={
                    "Authorization": f"Bearer {key}",
                    "Content-Type": "application/json",
                },
                json=payload,
            )
    except httpx.RequestError as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Upstream request failed: {exc!s}",
        ) from exc

    if r.status_code >= 400:
        raise HTTPException(
            status_code=502,
            detail=f"Dify returned {r.status_code}: {r.text[:500]}",
        )

    try:
        data = r.json()
    except ValueError as exc:
        raise HTTPException(
            status_code=502,
            detail="Dify response was not valid JSON.",
        ) from exc

    inner = data.get("data") if isinstance(data, dict) else None
    outputs = None
    if isinstance(inner, dict):
        outputs = inner.get("outputs")
    if not isinstance(outputs, dict) and isinstance(data, dict):
        outputs = data.get("outputs")
    if not isinstance(outputs, dict):
        raise HTTPException(
            status_code=502,
            detail="Unexpected Dify response shape (missing outputs object).",
        )

    summary = outputs.get(output_field)
    if summary is None and "." in output_field:
        summary = _nested_get(outputs, output_field)

    if summary is None:
        raise HTTPException(
            status_code=502,
            detail=f"Output field {output_field!r} not found in workflow outputs.",
        )

    if not isinstance(summary, str):
        summary = str(summary)

    return {"summary": summary.strip()}
