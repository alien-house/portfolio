import Link from 'next/link';
import type { Metadata } from 'next';
import { RevealAndLangEffects } from '@/components/RevealAndLangEffects';
import { YoutubeSummaryTool } from '@/components/YoutubeSummaryTool';

export const metadata: Metadata = {
  title: { absolute: 'AI YouTube Summary — Experiments · BriteWorks' },
};

export default function YoutubeSummaryExperimentPage() {
  return (
    <>
      <RevealAndLangEffects />

      <nav id="nav">
        <Link href="/" className="nav-logo">
          BriteWorks<em style={{ color: 'var(--accent-warm)', fontStyle: 'italic' }}>.</em>AI
        </Link>
        <Link href="/experiments" className="nav-back">
          ← <span className="ja">実験一覧へ戻る</span>
          <span className="en">Back to experiments</span>
        </Link>
        <button type="button" className="lang-toggle">
          EN
        </button>
      </nav>

      <nav className="breadcrumb" aria-label="breadcrumb">
        <Link href="/">Index</Link>
        <span className="sep">/</span>
        <Link href="/experiments">Experiments</Link>
        <span className="sep">/</span>
        <span>AI YouTube Summary</span>
      </nav>

      <article className="product">
        <div className="product-visual">
          <svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" aria-label="diagram: video to summary">
            <rect x="40" y="36" width="160" height="90" rx="3" />
            <polygon points="108,71 108,97 134,84" stroke="none" fill="currentColor" />
            <line x1="120" y1="126" x2="120" y2="154" />
            <polyline points="116,146 120,154 124,146" />
            <rect x="30" y="156" width="180" height="52" />
            <text
              x="120"
              y="178"
              textAnchor="middle"
              fontSize="8"
              fill="currentColor"
              stroke="none"
              letterSpacing="1.6"
            >
              TRANSCRIPT
            </text>
            <text x="120" y="194" textAnchor="middle" fontSize="7" fill="#7A7874" stroke="none">
              YouTube Captions API
            </text>
            <line x1="120" y1="208" x2="120" y2="238" />
            <polyline points="116,230 120,238 124,230" />
            <rect x="38" y="240" width="164" height="56" />
            <text
              x="120"
              y="262"
              textAnchor="middle"
              fontSize="8"
              fill="currentColor"
              stroke="none"
              letterSpacing="1.4"
            >
              LLM SUMMARY
            </text>
            <text x="120" y="278" textAnchor="middle" fontSize="7" fill="#7A7874" stroke="none">
              stream to UI
            </text>
          </svg>
          <span className="product-visual-label">
            <span className="ja">Fig. E1 — 処理の流れ</span>
            <span className="en">Fig. E1 — processing sketch</span>
          </span>
        </div>

        <div className="product-info">
          <p className="product-cat experiment-tag">— Exp. 01 / Summarization</p>
          <h1 className="product-title">
            <em>AI YouTube</em> Summary
          </h1>
          <p className="product-sub">youtube-summary · experiments</p>

          <p className="product-lede">
            <span className="ja">
              YouTube の公開動画 URL を入力するだけで、字幕テキストを取得し AI が要約して返します。Dify ワークフローと連携済みで、実際に動作します。
            </span>
            <span className="en">
              Paste a public YouTube URL — captions are fetched and summarized via a Dify workflow. Fully wired and
              working.
            </span>
          </p>

          <div className="spec-section">
            <div className="spec-row">
              <span className="spec-label">Type</span>
              <span className="spec-value">
                <span className="ja">インタラクティブ実験</span>
                <span className="en">Interactive experiment</span>
              </span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Interface</span>
              <span className="spec-value">
                <span className="ja">動画 URL → 要約テキスト表示</span>
                <span className="en">Video URL → summarized text</span>
              </span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Stack</span>
              <span className="spec-value">YouTube Transcript API · Dify · LLM</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Status</span>
              <span className="spec-value">
                <span className="ja">Dify ワークフロー接続済み・動作中</span>
                <span className="en">Live · Dify workflow connected</span>
              </span>
            </div>
          </div>

          <div className="swatches">
            <span className="swatch">YouTube</span>
            <span className="swatch">Captions</span>
            <span className="swatch">Dify</span>
            <span className="swatch">LLM</span>
          </div>

          <div className="cta-row">
            <a href="#experiment-live" className="btn-primary">
              <span className="ja">試すセクションへ</span>
              <span className="en">Jump to live UI</span>
              <span>↓</span>
            </a>
            <Link href="/#contact" className="btn-ghost">
              <span className="ja">同様の機能を相談</span>
              <span className="en">Discuss a build like this</span>
            </Link>
          </div>
        </div>
      </article>

      <YoutubeSummaryTool />

      <section className="detail-section">
        <div className="detail-grid">
          <span className="detail-num">01 / Goal</span>
          <div className="detail-body">
            <h2 className="detail-title">Purpose</h2>
            <p>
              <span className="ja">
                長尺の技術講義・カンファレンス・アーカイブを、後追いレビューや議事への転用できる短い知識に圧縮する。
                <strong>「見る時間がないときに、論点だけを安全に掬い取れる」</strong>
                ことを優先すると、モデルだけでなく転写経路や引用・出典ポリシーまで設計対象になる。
              </span>
              <span className="en">
                Compress long technical talks into reviewable briefing notes. Prioritizing{' '}
                <strong>recovering arguments without watching the clock</strong> forces design beyond the model —
                transcript sources, grounding and citation policy matter too.
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="detail-section">
        <div className="detail-grid">
          <span className="detail-num">02 / Flow</span>
          <div className="detail-body">
            <h2 className="detail-title">Pipeline sketch</h2>
            <div className="pipeline-flow">
              <div className="pipeline-step">
                <span className="num">N° 01</span>
                <span className="stage">
                  <span className="ja">入力検証・動画参照の解決</span>
                  <span className="en">Validate URL & resolve video reference</span>
                </span>
                <span className="tech">Public watch / youtu.be</span>
              </div>
              <div className="pipeline-step">
                <span className="num">N° 02</span>
                <span className="stage">
                  <span className="ja">字幕の取得</span>
                  <span className="en">Fetch captions</span>
                </span>
                <span className="tech">YouTube Transcript API</span>
              </div>
              <div className="pipeline-step">
                <span className="num">N° 03</span>
                <span className="stage">
                  <span className="ja">整形・チャンキング・要約</span>
                  <span className="en">Normalize, chunk & summarize</span>
                </span>
                <span className="tech">Token budget · hallucination guards</span>
              </div>
              <div className="pipeline-step">
                <span className="num">N° 04</span>
                <span className="stage">
                  <span className="ja">UI へのストリーム／表示</span>
                  <span className="en">Stream render to UI</span>
                </span>
                <span className="tech">SSE or chunked JSON · this surface</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-section">
        <div className="detail-grid">
          <span className="detail-num">03 / Notes</span>
          <div className="detail-body">
            <h2 className="detail-title">Design notes</h2>
            <ol className="list-clean">
              <li>
                <span className="ja">
                  AIが生成した要約は動画そのものではない。「公式字幕をもとに要約しています」といった出典情報をUIに表示し、ユーザーが判断できるようにする。
                </span>
                <span className="en">
                  AI-generated summaries are not the source — show users where the transcript came from (e.g. official
                  captions) so they can judge reliability themselves.
                </span>
              </li>
              <li>
                <span className="ja">
                  字幕テキストはYouTube Transcript APIで取得し、そのままDifyワークフローに渡して要約する。字幕が存在しない動画には非対応。
                </span>
                <span className="en">
                  Captions are fetched via YouTube Transcript API and passed directly to a Dify workflow for
                  summarization. Videos without captions are not supported.
                </span>
              </li>
              <li>
                <span className="ja">
                  YouTubeの利用規約やAPIの呼び出し制限・コストを考慮すると、処理対象の動画をあらかじめ決めておく運用が現実的。
                </span>
                <span className="en">
                  Given YouTube&apos;s TOS, rate limits and API costs, it&apos;s practical to pre-define which videos or
                  channels are allowed to be processed.
                </span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="next-section">
        <div className="next-inner">
          <div>
            <p className="next-eyebrow">
              <span className="ja">一覧へ</span>
              <span className="en">Experiment index</span>
            </p>
            <h2 className="next-title">
              See more <em>experiments</em>
            </h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Link href="/experiments" className="next-link">
              <span className="ja">実験トップへ</span>
              <span className="en">Experiments hub</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <p className="footer-copy">© 2026 — BriteWorks · AI Developer & UX Consultant</p>
          <div className="footer-links">
            <a href="https://github.com/alien-house" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://forms.gle/oMqXbGdAaw5aK77K9" target="_blank" rel="noopener noreferrer">
              Email
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
