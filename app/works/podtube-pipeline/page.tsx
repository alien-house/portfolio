import Link from 'next/link';
import type { Metadata } from 'next';
import { RevealAndLangEffects } from '@/components/RevealAndLangEffects';

export const metadata: Metadata = {
  title: 'YouTube AI Pipeline',
};

export default function PodtubePipelinePage() {
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
        <span>YouTube AI Pipeline</span>
      </nav>

      <article className="product">
        <div className="product-visual">
          <svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" aria-label="podtube pipeline">
            <rect x="20" y="30" width="200" height="50" />
            <text
              x="120"
              y="50"
              textAnchor="middle"
              fontSize="9"
              fontFamily="DM Sans"
              fill="currentColor"
              stroke="none"
              letterSpacing="1.5"
            >
              YOUTUBE CRAWL
            </text>
            <text
              x="120"
              y="64"
              textAnchor="middle"
              fontSize="7"
              fontFamily="DM Sans"
              fill="#7A7874"
              stroke="none"
              letterSpacing="1"
            >
              crawl.py · yt-dlp · parallel
            </text>
            <line x1="120" y1="80" x2="120" y2="106" />
            <polyline points="116,100 120,108 124,100" />
            <rect x="20" y="108" width="200" height="50" />
            <text
              x="120"
              y="128"
              textAnchor="middle"
              fontSize="9"
              fontFamily="DM Sans"
              fill="currentColor"
              stroke="none"
              letterSpacing="1.5"
            >
              WHISPER TRANSCRIBE
            </text>
            <text
              x="120"
              y="142"
              textAnchor="middle"
              fontSize="7"
              fontFamily="DM Sans"
              fill="#7A7874"
              stroke="none"
              letterSpacing="1"
            >
              faster-whisper · GPU serial
            </text>
            <line x1="120" y1="158" x2="120" y2="184" />
            <polyline points="116,178 120,186 124,178" />
            <rect x="20" y="186" width="200" height="60" />
            <text
              x="120"
              y="210"
              textAnchor="middle"
              fontSize="9"
              fontFamily="DM Sans"
              fill="currentColor"
              stroke="none"
              letterSpacing="1.5"
            >
              LLM ANALYSIS
            </text>
            <text
              x="120"
              y="225"
              textAnchor="middle"
              fontSize="7"
              fontFamily="DM Sans"
              fill="#7A7874"
              stroke="none"
              letterSpacing="1"
            >
              Ollama · Gemini · adaptive mode
            </text>
            <circle cx="60" cy="237" r="2" />
            <circle cx="68" cy="237" r="2" />
            <circle cx="76" cy="237" r="2" />
            <line x1="120" y1="246" x2="120" y2="270" />
            <polyline points="116,264 120,272 124,264" />
            <rect x="50" y="272" width="140" height="34" />
            <text
              x="120"
              y="288"
              textAnchor="middle"
              fontSize="9"
              fontFamily="DM Sans"
              fill="currentColor"
              stroke="none"
              letterSpacing="1.5"
            >
              SUPABASE
            </text>
            <text
              x="120"
              y="300"
              textAnchor="middle"
              fontSize="7"
              fontFamily="DM Sans"
              fill="#7A7874"
              stroke="none"
              letterSpacing="1"
            >
              structured store
            </text>
          </svg>
          <span className="product-visual-label">Fig. 02.A — pipeline schematic</span>
        </div>

        <div className="product-info">
          <p className="product-cat">— No. 02 / Pipeline</p>
          <h1 className="product-title">
            YouTube <em>AI</em> Pipeline
          </h1>
          <p className="product-sub">podtube-pipeline · 2024 — present</p>

          <p className="product-lede">
            <span className="ja">
              YouTube動画を自動収集 → 文字起こし → AI解析する一連のパイプライン。動画尺で処理モードを自動切替 (全文一括 vs
              時間窓)、並列ダウンロード × 直列GPU処理でスループットを最大化。
            </span>
            <span className="en">
              A pipeline that auto-crawls YouTube, transcribes audio and analyses it with an LLM. Switches
              strategy by video length (full-text vs windowed) and pairs parallel download with serial GPU work to
              maximise throughput.
            </span>
          </p>

          <div className="spec-section">
            <div className="spec-row">
              <span className="spec-label">Type</span>
              <span className="spec-value">
                <span className="ja">データ取得 · 解析パイプライン</span>
                <span className="en">Ingestion + analysis pipeline</span>
              </span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Role</span>
              <span className="spec-value">
                <span className="ja">アーキテクチャ · 実装</span>
                <span className="en">Architecture · Implementation</span>
              </span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Stack</span>
              <span className="spec-value">Python · faster-whisper · yt-dlp · Ollama · Gemini · Supabase</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Throughput</span>
              <span className="spec-value">
                <span className="ja">約 60本 / 時 (ローカルRTX環境)</span>
                <span className="en">~ 60 videos / hour (local RTX env)</span>
              </span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Status</span>
              <span className="spec-value">
                <span className="ja">継続開発中</span>
                <span className="en">Active development</span>
              </span>
            </div>
          </div>

          <div className="swatches">
            <span className="swatch">Python</span>
            <span className="swatch">Whisper</span>
            <span className="swatch">Ollama</span>
            <span className="swatch">Gemini</span>
            <span className="swatch">Supabase</span>
            <span className="swatch">yt-dlp</span>
          </div>

          <div className="cta-row">
            <a
              href="https://github.com/alien-house/podtube-pipeline"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span className="ja">GitHub を見る</span>
              <span className="en">View on GitHub</span>
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
                特定ジャンルのYouTube動向を継続的に追うために、視聴ではなく<strong>構造化データとして蓄積する</strong>
                必要があった。動画長や言語が混在するため、固定パイプラインではコストとレイテンシの両立が難しい。
              </span>
              <span className="en">
                To track a niche on YouTube continuously, the goal was to{' '}
                <strong>store content as structured data</strong> rather than watch it. With mixed video lengths
                and languages, a static pipeline can&apos;t balance cost and latency.
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="detail-section">
        <div className="detail-grid">
          <span className="detail-num">02 / Pipeline</span>
          <div className="detail-body">
            <h2 className="detail-title">Pipeline stages</h2>
            <div className="pipeline-flow">
              <div className="pipeline-step">
                <span className="num">N° 01</span>
                <span className="stage">
                  <span className="ja">YouTube収集</span>
                  <span className="en">YouTube crawl</span>
                </span>
                <span className="tech">crawl.py · yt-dlp · parallel download</span>
              </div>
              <div className="pipeline-step">
                <span className="num">N° 02</span>
                <span className="stage">
                  <span className="ja">Whisper文字起こし</span>
                  <span className="en">Whisper transcription</span>
                </span>
                <span className="tech">faster-whisper · GPU serial queue</span>
              </div>
              <div className="pipeline-step">
                <span className="num">N° 03</span>
                <span className="stage">
                  <span className="ja">LLM解析 (適応モード)</span>
                  <span className="en">LLM analysis (adaptive)</span>
                </span>
                <span className="tech">Ollama (local) · Gemini (long form)</span>
              </div>
              <div className="pipeline-step">
                <span className="num">N° 04</span>
                <span className="stage">
                  <span className="ja">構造化保存</span>
                  <span className="en">Structured store</span>
                </span>
                <span className="tech">Supabase · pgvector embeddings</span>
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
                <span className="ja">短尺は全文一括、長尺は時間窓 ─ 動画長で処理モードを自動切替。</span>
                <span className="en">Short clips: full-pass. Long clips: windowed. Mode switches automatically by length.</span>
              </li>
              <li>
                <span className="ja">ダウンロード並列 × GPU処理直列でボトルネック解消。</span>
                <span className="en">Parallel downloads + serial GPU work removed the throughput bottleneck.</span>
              </li>
              <li>
                <span className="ja">機密性の高いログはローカルOllama、汎用解析はGemini。コストと精度を両立。</span>
                <span className="en">
                  Sensitive transcripts stay local on Ollama; general analysis goes to Gemini — cost & quality
                  balanced.
                </span>
              </li>
              <li>
                <span className="ja">Supabaseで埋め込み付きで保存 ─ 後段の検索 / 分析に直結。</span>
                <span className="en">Stored in Supabase with embeddings — feeds search and downstream analytics directly.</span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="next-section">
        <div className="next-inner">
          <div>
            <p className="next-eyebrow">— Next case</p>
            <h2 className="next-title">
              Internal FAQ <em>RAG</em> Chatbot
            </h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Link href="/works/faq-rag" className="next-link">
              <span className="ja">次へ</span>
              <span className="en">Next</span>
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
