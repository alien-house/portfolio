/**
 * Vercel Serverless で Dify（VPS 上）へのプロキシ。
 * `DIFY_WORKFLOW_URL` は VPS で動いている Dify のワークフロー実行 URL に合わせる。
 * @see ../../vercel.env.example
 */

function nestedGet(obj, path) {
  return path.split('.').reduce((cur, key) => {
    if (cur && typeof cur === 'object') return cur[key];
    return undefined;
  }, obj);
}

function pickOutputs(parsed) {
  if (!parsed || typeof parsed !== 'object') return null;
  const inner = parsed.data;
  let outputs =
    inner && typeof inner === 'object' ? inner.outputs : undefined;
  if (!outputs || typeof outputs !== 'object') {
    outputs = parsed.outputs;
  }
  return outputs && typeof outputs === 'object' ? outputs : null;
}

function applyCors(req, res) {
  const raw = process.env.ALLOW_ORIGINS;
  const origin = req.headers.origin;
  if (!origin) return;
  if (!raw || raw.trim() === '*') {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return;
  }
  const list = raw.split(',').map((s) => s.trim()).filter(Boolean);
  if (list.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
}

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  applyCors(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ detail: 'Method not allowed' });
  }

  const key = (process.env.DIFY_API_KEY || '').trim();
  const workflowUrl = (process.env.DIFY_WORKFLOW_URL || '').trim();
  if (!key || !workflowUrl) {
    return res.status(503).json({
      detail: 'DIFY_API_KEY / DIFY_WORKFLOW_URL are not configured in Vercel.',
    });
  }

  const inputField = (process.env.DIFY_INPUT_FIELD || 'youtube_url').trim() || 'youtube_url';
  const outputField = (process.env.DIFY_OUTPUT_FIELD || 'text').trim() || 'text';

  let body;
  try {
    if (typeof req.body === 'string') {
      body = JSON.parse(req.body || '{}');
    } else if (req.body && typeof req.body === 'object') {
      body = req.body;
    } else {
      body = {};
    }
  } catch {
    return res.status(400).json({ detail: 'Invalid JSON body' });
  }
  if (typeof body !== 'object' || body === null) {
    return res.status(400).json({ detail: 'Invalid JSON body' });
  }

  const url =
    typeof body.youtube_url === 'string'
      ? body.youtube_url.trim().slice(0, 4096)
      : typeof body.url === 'string'
        ? body.url.trim().slice(0, 4096)
        : '';
  if (url.length < 8) {
    return res.status(400).json({ detail: 'Missing or invalid "url"' });
  }

  const payload = {
    inputs: { [inputField]: url },
    response_mode: 'blocking',
    user: 'portfolio-visitor',
  };

  let upstream;
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
    return res.status(502).json({
      detail: `Upstream fetch failed: ${e && e.message ? e.message : String(e)}`,
    });
  }

  const txt = await upstream.text();
  let data;
  try {
    data = txt ? JSON.parse(txt) : null;
  } catch {
    return res.status(502).json({
      detail: `Dify returned non-JSON (${upstream.status}). ${txt.slice(
        0,
        300,
      )}`,
    });
  }

  if (!upstream.ok) {
    const msg =
      data && typeof data === 'object' && data.detail
        ? typeof data.detail === 'string'
          ? data.detail
          : JSON.stringify(data.detail)
        : txt.slice(0, 400);
    return res.status(502).json({ detail: `Dify HTTP ${upstream.status}: ${msg}` });
  }

  const outputs = pickOutputs(data);
  if (!outputs) {
    return res.status(502).json({
      detail: 'Unexpected Dify shape (missing outputs).',
    });
  }

  let summary =
    Object.prototype.hasOwnProperty.call(outputs, outputField)
      ? outputs[outputField]
      : nestedGet(outputs, outputField);

  if (summary == null) {
    return res.status(502).json({
      detail: `Output field ${JSON.stringify(outputField)} not found.`,
    });
  }
  summary = typeof summary === 'string' ? summary.trim() : String(summary);

  return res.status(200).json({ summary });
};
