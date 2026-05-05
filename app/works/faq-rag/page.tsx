import Link from 'next/link';
import type { Metadata } from 'next';
import { RevealAndLangEffects } from '@/components/RevealAndLangEffects';

export const metadata: Metadata = {
  title: 'Internal FAQ RAG Chatbot',
};

export default function FaqRagPage() {
  return (
    <>
      <RevealAndLangEffects />

      <nav id="nav">
        <Link href="/" className="nav-logo">
          BriteWorks<em style={{ color: 'var(--accent-warm)', fontStyle: 'italic' }}>.</em>AI
        </Link>
        <Link href="/#works" className="nav-back">
          ← <span className="ja">制作物一覧へ戻る</span>
          <span className="en">Back to works</span>
        </Link>
        <button type="button" className="lang-toggle">
          EN
        </button>
      </nav>

      <nav className="breadcrumb" aria-label="breadcrumb">
        <Link href="/">Index</Link>
        <span className="sep">/</span>
        <Link href="/#works">Works</Link>
        <span className="sep">/</span>
        <span>Internal FAQ RAG</span>
      </nav>

      <article className="product">
        <div className="product-visual">
          <svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" aria-label="rag system">
            <rect x="20" y="30" width="80" height="100" />
            <line x1="30" y1="44" x2="90" y2="44" />
            <line x1="30" y1="54" x2="90" y2="54" />
            <line x1="30" y1="64" x2="80" y2="64" />
            <line x1="30" y1="74" x2="90" y2="74" />
            <line x1="30" y1="84" x2="76" y2="84" />
            <line x1="30" y1="94" x2="90" y2="94" />
            <line x1="30" y1="104" x2="84" y2="104" />
            <line x1="30" y1="114" x2="90" y2="114" />
            <text
              x="60"
              y="148"
              textAnchor="middle"
              fontSize="7"
              fontFamily="DM Sans"
              fill="#7A7874"
              stroke="none"
              letterSpacing="1"
            >
              CORPUS
            </text>

            <line x1="100" y1="80" x2="138" y2="80" />
            <polyline points="132,76 140,80 132,84" />

            <rect x="140" y="40" width="80" height="14" />
            <rect x="140" y="60" width="80" height="14" />
            <rect x="140" y="80" width="80" height="14" />
            <rect x="140" y="100" width="80" height="14" />
            <text
              x="180"
              y="128"
              textAnchor="middle"
              fontSize="7"
              fontFamily="DM Sans"
              fill="#7A7874"
              stroke="none"
              letterSpacing="1"
            >
              CHUNKS + EMBED
            </text>

            <line x1="120" y1="170" x2="120" y2="190" />
            <rect x="40" y="190" width="160" height="36" />
            <text
              x="120"
              y="208"
              textAnchor="middle"
              fontSize="9"
              fontFamily="DM Sans"
              fill="currentColor"
              stroke="none"
              letterSpacing="1.5"
            >
              RETRIEVE + RERANK
            </text>
            <text
              x="120"
              y="220"
              textAnchor="middle"
              fontSize="7"
              fontFamily="DM Sans"
              fill="#7A7874"
              stroke="none"
              letterSpacing="1"
            >
              cohere reranking
            </text>

            <line x1="120" y1="226" x2="120" y2="246" />
            <polyline points="116,240 120,248 124,240" />

            <rect x="40" y="248" width="160" height="48" />
            <text
              x="120"
              y="270"
              textAnchor="middle"
              fontSize="9"
              fontFamily="DM Sans"
              fill="currentColor"
              stroke="none"
              letterSpacing="1.5"
            >
              DIFY · LLM ANSWER
            </text>
            <text
              x="120"
              y="284"
              textAnchor="middle"
              fontSize="7"
              fontFamily="DM Sans"
              fill="#7A7874"
              stroke="none"
              letterSpacing="1"
            >
              cited · grounded
            </text>
          </svg>
          <span className="product-visual-label">Fig. 03.A — RAG schematic</span>
        </div>

        <div className="product-info">
          <p className="product-cat">— No. 03 / RAG</p>
          <h1 className="product-title">
            Internal FAQ <em>RAG</em> Chatbot
          </h1>
          <p className="product-sub">dify · cohere reranking · 2024</p>

          <p className="product-lede">
            <span className="ja">
              社内マニュアルをナレッジ化したRAGチャット。チャンクサイズ・Cohereリランキングを地道に調整し、回答精度を改善。改善プロセスをドキュメント化し、運用引き継ぎまで設計。
            </span>
            <span className="en">
              A RAG chatbot trained on internal manuals. Tuned chunk sizes and Cohere reranking to improve retrieval
              accuracy, with the iteration process documented for hand-off.
            </span>
          </p>

          <div className="spec-section">
            <div className="spec-row">
              <span className="spec-label">Type</span>
              <span className="spec-value">
                <span className="ja">社内ナレッジ × 検索拡張生成</span>
                <span className="en">Internal knowledge · RAG</span>
              </span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Role</span>
              <span className="spec-value">
                <span className="ja">設計 · チューニング · ドキュメント化</span>
                <span className="en">Design · Tuning · Documentation</span>
              </span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Stack</span>
              <span className="spec-value">Dify (self-hosted) · Cohere Rerank · VPS</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Accuracy</span>
              <span className="spec-value">
                <span className="ja">Top-3 適中 +28pt (調整前後比較)</span>
                <span className="en">+28pt Top-3 hit rate (pre/post tuning)</span>
              </span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Status</span>
              <span className="spec-value">
                <span className="ja">運用中 · 継続チューニング</span>
                <span className="en">In use · ongoing tuning</span>
              </span>
            </div>
          </div>

          <div className="swatches">
            <span className="swatch">Dify</span>
            <span className="swatch">RAG</span>
            <span className="swatch">Cohere</span>
            <span className="swatch">VPS</span>
            <span className="swatch">pgvector</span>
          </div>

          <div className="cta-row">
            <a href="https://github.com/alien-house" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <span className="ja">案件詳細を読む</span>
              <span className="en">Read case study</span>
              <span>→</span>
            </a>
            <Link href="/#contact" className="btn-ghost">
              <span className="ja">この件で相談する</span>
              <span className="en">Discuss this</span>
            </Link>
          </div>
        </div>
      </article>

      <section className="detail-section">
        <div className="detail-grid">
          <span className="detail-num">01 / Context</span>
          <div className="detail-body">
            <h2 className="detail-title">Background</h2>
            <p>
              <span className="ja">
                蓄積されたマニュアルや手順書が「どこにあるか」を探すだけで30分。社員の暗黙知も含め、
                <strong>聞けば答えてくれる入口</strong>
                を社内に置くことで、検索コストとオンボーディング時間を圧縮することが目的。
              </span>
              <span className="en">
                Finding the right manual takes 30 minutes. The goal: place a single{' '}
                <strong>ask-and-get-answered surface</strong> inside the company to compress lookup cost and
                onboarding time.
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="detail-section">
        <div className="detail-grid">
          <span className="detail-num">02 / Tuning</span>
          <div className="detail-body">
            <h2 className="detail-title">Tuning loop</h2>
            <div className="pipeline-flow">
              <div className="pipeline-step">
                <span className="num">N° 01</span>
                <span className="stage">
                  <span className="ja">チャンクサイズ調整</span>
                  <span className="en">Chunk-size sweep</span>
                </span>
                <span className="tech">256 / 512 / 1024 token splits</span>
              </div>
              <div className="pipeline-step">
                <span className="num">N° 02</span>
                <span className="stage">
                  <span className="ja">埋め込みモデル比較</span>
                  <span className="en">Embedding comparison</span>
                </span>
                <span className="tech">multilingual · domain bias check</span>
              </div>
              <div className="pipeline-step">
                <span className="num">N° 03</span>
                <span className="stage">
                  <span className="ja">Cohereリランキング導入</span>
                  <span className="en">Cohere reranking</span>
                </span>
                <span className="tech">retrieve-30 → rerank-top-5</span>
              </div>
              <div className="pipeline-step">
                <span className="num">N° 04</span>
                <span className="stage">
                  <span className="ja">回答評価セット運用</span>
                  <span className="en">Eval-set ops</span>
                </span>
                <span className="tech">human label · regression check</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-section">
        <div className="detail-grid">
          <span className="detail-num">03 / Outcome</span>
          <div className="detail-body">
            <h2 className="detail-title">Outcomes &amp; decisions</h2>
            <ol className="list-clean">
              <li>
                <span className="ja">チャンクサイズの調整により検索精度が向上し、的外れな回答が減少した。</span>
                <span className="en">
                  Reranking noticeably improved retrieval relevance — irrelevant chunks dropped from responses after
                  tuning.
                </span>
              </li>
              <li>
                <span className="ja">回答に必ず引用元を表示 ─ 信頼性を担保。</span>
                <span className="en">Every answer is cited — trust is non-negotiable for internal use.</span>
              </li>
              <li>
                <span className="ja">改善ログをドキュメント化、運用担当に引き継げる構成。</span>
                <span className="en">Tuning history is documented so the in-house team can continue iterating.</span>
              </li>
              <li>
                <span className="ja">Difyワークフローでアクセス権限を分離、機密文書のスコープを制御。</span>
                <span className="en">Dify workflows scope access — confidential docs stay restricted.</span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="next-section">
        <div className="next-inner">
          <div>
            <p className="next-eyebrow">— Back to top</p>
            <h2 className="next-title">
              Browse other <em>work</em>
            </h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Link href="/#works" className="next-link">
              <span className="ja">一覧へ</span>
              <span className="en">All works</span>
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
