import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;

function nestedGet(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((cur, key) => {
    if (cur && typeof cur === 'object' && key in (cur as object)) {
      return (cur as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

function pickOutputs(parsed: unknown): Record<string, unknown> | null {
  if (!parsed || typeof parsed !== 'object') return null;
  const p = parsed as Record<string, unknown>;
  const inner = p.data;
  let outputs: unknown =
    inner && typeof inner === 'object'
      ? (inner as Record<string, unknown>).outputs
      : undefined;
  if (!outputs || typeof outputs !== 'object') {
    outputs = p.outputs;
  }
  return outputs && typeof outputs === 'object'
    ? (outputs as Record<string, unknown>)
    : null;
}

function applyCors(request: NextRequest, response: NextResponse) {
  const raw = process.env.ALLOW_ORIGINS;
  const origin = request.headers.get('origin');
  if (!origin) return;
  if (!raw || raw.trim() === '*') {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return;
  }
  const list = raw.split(',').map((s) => s.trim()).filter(Boolean);
  if (list.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  }
}

export async function OPTIONS(request: NextRequest) {
  const res = new NextResponse(null, { status: 204 });
  applyCors(request, res);
  return res;
}

export async function POST(request: NextRequest) {
  const key = (process.env.DIFY_API_KEY || '').trim();
  const workflowUrl = (process.env.DIFY_WORKFLOW_URL || '').trim();
  if (!key || !workflowUrl) {
    const res = NextResponse.json(
      {
        detail:
          'DIFY_API_KEY / DIFY_WORKFLOW_URL are not configured in Vercel.',
      },
      { status: 503 },
    );
    applyCors(request, res);
    return res;
  }

  const inputField =
    (process.env.DIFY_INPUT_FIELD || 'youtube_url').trim() || 'youtube_url';
  const outputField =
    (process.env.DIFY_OUTPUT_FIELD || 'text').trim() || 'text';

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    const res = NextResponse.json({ detail: 'Invalid JSON body' }, {
      status: 400,
    });
    applyCors(request, res);
    return res;
  }
  if (typeof body !== 'object' || body === null) {
    const res = NextResponse.json({ detail: 'Invalid JSON body' }, {
      status: 400,
    });
    applyCors(request, res);
    return res;
  }

  const url =
    typeof body.youtube_url === 'string'
      ? body.youtube_url.trim().slice(0, 4096)
      : typeof body.url === 'string'
        ? body.url.trim().slice(0, 4096)
        : '';
  if (url.length < 8) {
    const res = NextResponse.json(
      { detail: 'Missing or invalid "url"' },
      { status: 400 },
    );
    applyCors(request, res);
    return res;
  }

  const payload = {
    inputs: { [inputField]: url },
    response_mode: 'blocking',
    user: 'portfolio-visitor',
  };

  let upstream: Response;
  try {
    upstream = await fetch(workflowUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    const res = NextResponse.json(
      { detail: `Upstream fetch failed: ${msg}` },
      { status: 502 },
    );
    applyCors(request, res);
    return res;
  }

  const txt = await upstream.text();
  let data: unknown;
  try {
    data = txt ? JSON.parse(txt) : null;
  } catch {
    const res = NextResponse.json(
      {
        detail: `Dify returned non-JSON (${upstream.status}). ${txt.slice(0, 300)}`,
      },
      { status: 502 },
    );
    applyCors(request, res);
    return res;
  }

  if (!upstream.ok) {
    const d =
      data && typeof data === 'object' && 'detail' in data
        ? (data as { detail: unknown }).detail
        : undefined;
    const msg =
      typeof d === 'string'
        ? d
        : d !== undefined
          ? JSON.stringify(d)
          : txt.slice(0, 400);
    const res = NextResponse.json(
      { detail: `Dify HTTP ${upstream.status}: ${msg}` },
      { status: 502 },
    );
    applyCors(request, res);
    return res;
  }

  const outputs = pickOutputs(data);
  if (!outputs) {
    const res = NextResponse.json(
      { detail: 'Unexpected Dify shape (missing outputs).' },
      { status: 502 },
    );
    applyCors(request, res);
    return res;
  }

  let summary: unknown = Object.prototype.hasOwnProperty.call(
    outputs,
    outputField,
  )
    ? outputs[outputField]
    : nestedGet(outputs, outputField);

  if (summary == null) {
    const res = NextResponse.json(
      { detail: `Output field ${JSON.stringify(outputField)} not found.` },
      { status: 502 },
    );
    applyCors(request, res);
    return res;
  }
  summary =
    typeof summary === 'string' ? summary.trim() : String(summary);

  const json = NextResponse.json({ summary });
  applyCors(request, json);
  return json;
}
