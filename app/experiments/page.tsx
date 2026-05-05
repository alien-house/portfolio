import Link from 'next/link';
import type { Metadata } from 'next';
import { RevealAndLangEffects } from '@/components/RevealAndLangEffects';

export const metadata: Metadata = {
  title: 'Experiments',
};

export default function ExperimentsIndexPage() {
  return (
    <>
      <RevealAndLangEffects />

      <nav id="nav">
        <Link href="/" className="nav-logo">
          BriteWorks<em style={{ color: 'var(--accent-warm)', fontStyle: 'italic' }}>.</em>AI
        </Link>
        <Link href="/#experiments" className="nav-back">
          ← <span className="ja">ポートフォリオへ戻る</span>
          <span className="en">Back to portfolio</span>
        </Link>
        <button type="button" className="lang-toggle">
          EN
        </button>
      </nav>

      <nav className="breadcrumb" aria-label="breadcrumb">
        <Link href="/">Index</Link>
        <span className="sep">/</span>
        <span>Experiments</span>
      </nav>

      <section className="experiments-list-head-wrap">
        <div className="experiments-list-head reveal">
          <span className="section-num">Laboratory · 実験</span>
          <h1>
            Tiny <em>experiments.</em>
          </h1>
          <p className="lede">
            <span className="ja">
              実装途中のプロトタイプや、小さなアイデアの実験場。UI から試せるものは順次バックエンドと繋げています。
            </span>
            <span className="en">
              Portfolio-adjacent prototypes — tighter tiles than Works (desktop band tops out at five) with backends
              swapped in later.
            </span>
          </p>
        </div>
      </section>

      <div className="experiments-list-board-wrap">
        <div className="experiments-grid">
          <Link href="/experiments/youtube-summary" className="experiment-card reveal">
            <div className="experiment-thumb">
              <svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="12" y="18" width="76" height="44" rx="2" />
                <polygon points="44,34 44,54 62,44" stroke="none" fill="currentColor" />
                <line x1="12" y1="72" x2="88" y2="72" />
                <line x1="18" y1="76" x2="82" y2="76" strokeDasharray="3 4" opacity="0.45" />
              </svg>
            </div>
            <div className="experiment-meta">
              <span className="experiment-num">
                <span className="ja">実験 01</span>
                <span className="en">EXP 01</span>
              </span>
              <span className="experiment-cat">Summarization</span>
            </div>
            <h3 className="experiment-card-title">
              <em>AI YouTube</em> Summary
            </h3>
            <p className="experiment-card-sub">youtube-summary</p>
            <div className="experiment-card-cta">
              <span>
                <span className="ja">読む／試す</span>
                <span className="en">Open</span>
              </span>
              <span className="arrow">→</span>
            </div>
          </Link>
          <div className="experiment-coming-slot reveal">
            <p>
              <span className="ja">
                空き
                <br />
                順次公開
              </span>
              <span className="en">
                More
                <br />
                soon
              </span>
            </p>
          </div>
        </div>
      </div>

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
