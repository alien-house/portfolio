'use client';

import { FormEvent, useMemo, useRef, useState } from 'react';

function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function proseSummaryToHtml(text: string) {
  const escaped = escapeHtml(String(text).trim()).replace(/\n/g, '<br>');
  return '<p class="experiment-summary-prose">' + escaped + '</p>';
}

function formatSummaryAsHtml(text: string) {
  const raw = String(text).trim();
  if (!raw) return '';

  let t = raw;
  if (t.startsWith('「') && t.endsWith('」')) {
    t = t.slice(1, -1).trim();
  }

  const lines = t.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const bulletLead = /^(?:「\s*)?[-*•–—‐]\s+/u;

  const items: string[] = [];
  for (const line of lines) {
    const L = line.trim();
    const isBullet = bulletLead.test(L);
    if (isBullet) {
      const content = L.replace(bulletLead, '').trim();
      items.push(content);
    } else if (items.length > 0) {
      items[items.length - 1] =
        `${items[items.length - 1]} ${line}`.trim();
    } else {
      return proseSummaryToHtml(raw);
    }
  }

  if (items.length === 0) return proseSummaryToHtml(raw);

  return (
    '<ul class="experiment-summary-list">' +
    items.map((item) => '<li>' + escapeHtml(item) + '</li>').join('') +
    '</ul>'
  );
}

function isLikelyYoutubeUrl(value: string) {
  try {
    const u = new URL(value.trim());
    const h = u.hostname.replace(/^www\./, '');
    return (
      h === 'youtube.com' ||
      h === 'm.youtube.com' ||
      h === 'youtu.be' ||
      h.endsWith('.youtube.com')
    );
  } catch {
    return false;
  }
}

function placeholderSummary() {
  return (
    '<p><span class="ja">冒頭では「ツール選択」より先に業務コンテキストの言語化が必要だというスタンスが示される。続いて、入力データの整形・権限・ログ保全といった運用要件が、モデル選定より先に検討されるべきだと論じられている。中盤以降では、評価指標がビジネスKPIとどう繋げるか、ダッシュボード観察の粒度、そして異常検知のアラート設計まで踏み込む。結論として、自動化比率を一気に上げるより、レビューを挟んだ部分自動化から始め、ログを資産として蓄積する反復サイクルを推している。</span><span class="en">Opens with grounding business context before tool choice — then shifts to data hygiene, RBAC and audit logs as prerequisites ahead of picking a model. Mid-section ties evaluation metrics to business KPIs, dashboard granularity and alert design for drift or failure spikes. Closing argument favors partial automation with human review and iterative logging over a big‑bang rollout.</span></p>'
  );
}

type Props = { difyEndpoint?: string };

export function YoutubeSummaryTool({ difyEndpoint = '/api/portfolio/youtube-dify-summary' }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [outputHtml, setOutputHtml] = useState<string | null>(null);
  const [outputState, setOutputState] = useState<
    'idle' | 'loading' | 'success' | 'error' | 'mock'
  >('idle');
  const outputRef = useRef<HTMLDivElement>(null);

  const resolvedEndpoint = useMemo(() => {
    if (!difyEndpoint) return '';
    if (!difyEndpoint.startsWith('/')) return difyEndpoint;
    if (typeof window === 'undefined') return '';
    try {
      return new URL(difyEndpoint, window.location.origin).href;
    } catch {
      return difyEndpoint;
    }
  }, [difyEndpoint]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const rawUrl = (form.elements.namedItem('youtube_url') as HTMLInputElement).value.trim();

    setOutputState('idle');

    if (!isLikelyYoutubeUrl(rawUrl)) {
      setOutputHtml(
        '<p class="ja" style="color:var(--accent-warm);">YouTube の動画 URL を入力してください（youtube.com または youtu.be）。</p>' +
          '<p class="en" style="color:var(--accent-warm);">Enter a valid YouTube video URL (youtube.com or youtu.be).</p>',
      );
      setOutputState('error');
      return;
    }

    setSubmitting(true);
    setOutputState('loading');
    setOutputHtml(
      '<span class="experiment-spinner" aria-hidden="true"></span>' +
        '<span class="ja">要約を生成中…</span>' +
        '<span class="en">Summarizing…</span>',
    );

    try {
      if (resolvedEndpoint) {
        const res = await fetch(resolvedEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: rawUrl }),
        });
        const ct = res.headers.get('content-type') || '';
        const body = ct.includes('application/json') ? await res.json() : null;

        if (!res.ok) {
          let msg = `HTTP ${res.status}`;
          if (body && body.detail !== undefined) {
            const d = body.detail;
            msg = typeof d === 'string' ? d : JSON.stringify(d);
          }
          throw new Error(msg);
        }

        const summaryText =
          body && typeof body.summary === 'string' ? body.summary : null;
        if (!summaryText) {
          throw new Error('Invalid proxy response (no summary field).');
        }

        setOutputHtml(formatSummaryAsHtml(summaryText));
        setOutputState('success');
      } else {
        await new Promise((r) => setTimeout(r, 1200));
        setOutputHtml(placeholderSummary());
        setOutputState('mock');
      }
    } catch (err) {
      console.error(err);
      const message =
        err && typeof err === 'object' && 'message' in err
          ? String((err as Error).message)
          : String(err);
      setOutputHtml(
        '<p class="ja" style="color:var(--accent-warm);">エラーが発生しました（プロキシ・CORS・Dify 側の確認）。</p>' +
          '<p class="en" style="color:var(--accent-warm);">Something went wrong. Check proxy, CORS, and Dify.</p>' +
          `<p style="margin-top:0.65rem;font-size:0.8rem;color:var(--text-light);word-break:break-all">${escapeHtml(message)}</p>`,
      );
      setOutputState('error');
    }

    setSubmitting(false);
    outputRef.current?.focus();
  }

  return (
    <section className="experiment-tool" id="experiment-live">
      <div className="experiment-tool-inner reveal">
        <p className="experiment-tool-eyebrow">Live UI · prototype</p>
        <form
          id="exp-youtube-form"
          className="experiment-demo-form"
          noValidate
          onSubmit={onSubmit}
        >
          <div className="experiment-demo-row">
            <div className="experiment-demo-field">
              <label htmlFor="exp-youtube-url">YouTube URL</label>
              <input
                id="exp-youtube-url"
                name="youtube_url"
                type="url"
                required
                placeholder="https://www.youtube.com/watch?v=…"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
              />
            </div>
            <div className="experiment-demo-actions">
              <button
                type="submit"
                className="btn-primary"
                id="exp-submit-summary"
                disabled={submitting}
              >
                <span className="ja">要約を生成</span>
                <span className="en">Summarize</span>
                <span>→</span>
              </button>
            </div>
          </div>
          <p className="hint">
            <span className="ja">
              字幕が取得できる公開動画であれば要約が返ります。字幕のない動画には対応していません。
            </span>
            <span className="en">
              Works with public videos that have captions available. Videos without captions are not supported.
            </span>
          </p>
          <div className="experiment-output-wrap">
            <h2 className="experiment-output-title">
              <span className="ja">要約結果</span>
              <span className="en">Summary</span>
            </h2>
            <div
              ref={outputRef}
              id="exp-summary-output"
              className={
                'experiment-output' +
                (outputState === 'error' ? ' has-error' : '') +
                (outputState === 'loading' ? ' is-loading' : '')
              }
              tabIndex={-1}
              role="region"
              aria-live="polite"
              data-state={
                outputState === 'idle' ? undefined : outputState
              }
              dangerouslySetInnerHTML={
                outputHtml !== null
                  ? { __html: outputHtml }
                  : {
                      __html:
                        '<span class="ja">URL を入力して「要約を生成」を押すと、ここに要約が表示されます。</span><span class="en">Enter a URL and press Summarize — the result will appear here.</span>',
                    }
              }
            />
          </div>
        </form>
      </div>
    </section>
  );
}
