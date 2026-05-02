function toggleLang() {
  const body = document.body;
  const btn = document.querySelector('.lang-toggle');
  body.classList.toggle('en-mode');
  btn.textContent = body.classList.contains('en-mode') ? 'JA' : 'EN';
}

/**
 * ブラウザは Dify / VPS に直叩きしない。公開するのはプロキシの URL だけ。
 *
 * - ポートフォリオ本体: Vercel（静的 + このリポジトリの Serverless）。
 * - Dify ワークフロー API: VPS 上。シークレットは Vercel の環境変数 DIFY_* にだけ置く。
 * - VPS 側プロキシ（youtube_summary）は必須ではない。並行運用は可。
 *
 * メタまたは window.PORTFOLIO_YOUTUBE_DIFY_ENDPOINT:
 * Vercel 同一サイトなら `/api/portfolio/youtube-dify-summary` でよい。
 */
function getYoutubeDifyEndpoint() {
  let raw =
    document.querySelector('meta[name="portfolio-youtube-dify-endpoint"]')?.getAttribute('content')?.trim() ||
    (typeof window.PORTFOLIO_YOUTUBE_DIFY_ENDPOINT === 'string'
      ? window.PORTFOLIO_YOUTUBE_DIFY_ENDPOINT.trim()
      : '');

  if (!raw) return '';

  if (raw.startsWith('/')) {
    if (window.location.protocol === 'file:') {
      return '';
    }
    try {
      return new URL(raw, window.location.origin).href;
    } catch {
      return raw;
    }
  }
  return raw;
}

function initYoutubeSummaryDemo() {
  const form = document.getElementById('exp-youtube-form');
  if (!form) return;

  const urlInput = document.getElementById('exp-youtube-url');
  const submitBtn = document.getElementById('exp-submit-summary');
  const output = document.getElementById('exp-summary-output');

  const difyEndpoint = getYoutubeDifyEndpoint();

  function isLikelyYoutubeUrl(value) {
    try {
      const u = new URL(value.trim());
      const h = u.hostname.replace(/^www\./, '');
      return h === 'youtube.com' ||
        h === 'm.youtube.com' ||
        h === 'youtu.be' ||
        h.endsWith('.youtube.com');
    } catch {
      return false;
    }
  }

  function placeholderSummary() {
    return (
      '<p><span class="ja">冒頭では「ツール選択」より先に業務コンテキストの言語化が必要だというスタンスが示される。続いて、入力データの整形・権限・ログ保全といった運用要件が、モデル選定より先に検討されるべきだと論じられている。中盤以降では、評価指標がビジネスKPIとどう繋げるか、ダッシュボード観察の粒度、そして異常検知のアラート設計まで踏み込む。結論として、自動化比率を一気に上げるより、レビューを挟んだ部分自動化から始め、ログを資産として蓄積する反復サイクルを推している。</span><span class="en">Opens with grounding business context before tool choice — then shifts to data hygiene, RBAC and audit logs as prerequisites ahead of picking a model. Mid-section ties evaluation metrics to business KPIs, dashboard granularity and alert design for drift or failure spikes. Closing argument favors partial automation with human review and iterative logging over a big‑bang rollout.</span></p>'
    );
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const rawUrl = urlInput.value.trim();

    output.classList.remove('has-error', 'is-loading');
    output.removeAttribute('data-state');

    if (!isLikelyYoutubeUrl(rawUrl)) {
      output.innerHTML =
        '<p class="ja" style="color:var(--accent-warm);">YouTube の動画 URL を入力してください（youtube.com または youtu.be）。</p>' +
        '<p class="en" style="color:var(--accent-warm);">Enter a valid YouTube video URL (youtube.com or youtu.be).</p>';
      output.classList.add('has-error');
      output.setAttribute('data-state', 'error');
      return;
    }

    output.classList.add('is-loading');
    output.setAttribute('data-state', 'loading');
    output.innerHTML =
      '<span class="experiment-spinner" aria-hidden="true"></span>' +
      '<span class="ja">要約を生成中…</span>' +
      '<span class="en">Summarizing…</span>';

    try {
      if (difyEndpoint) {
        const res = await fetch(difyEndpoint, {
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

        const summaryText = body && typeof body.summary === 'string' ? body.summary : null;
        if (!summaryText) {
          throw new Error('Invalid proxy response (no summary field).');
        }

        output.classList.remove('is-loading');
        output.removeAttribute('data-state');
        output.textContent = summaryText;
        output.setAttribute('data-state', 'success');
      } else {
        await new Promise((r) => setTimeout(r, 1200));
        output.classList.remove('is-loading');
        output.removeAttribute('data-state');
        output.innerHTML = placeholderSummary();
        output.setAttribute('data-state', 'mock');
      }
    } catch (err) {
      console.error(err);
      output.classList.remove('is-loading');
      output.setAttribute('data-state', 'error');
      output.innerHTML =
        '<p class="ja" style="color:var(--accent-warm);">エラーが発生しました（プロキシ・CORS・Dify 側の確認）。</p>' +
        '<p class="en" style="color:var(--accent-warm);">Something went wrong. Check proxy, CORS, and Dify.</p>';
      const detailEl = document.createElement('p');
      detailEl.style.marginTop = '0.65rem';
      detailEl.style.fontSize = '0.8rem';
      detailEl.style.color = 'var(--text-light)';
      detailEl.style.wordBreak = 'break-all';
      detailEl.textContent = String(err && err.message ? err.message : err);
      output.appendChild(detailEl);
    }

    submitBtn.disabled = false;
    if (typeof output.focus === 'function') output.focus();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initYoutubeSummaryDemo();

  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 70);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
});
