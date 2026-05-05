import Link from 'next/link';
import { RevealAndLangEffects } from '@/components/RevealAndLangEffects';

export default function HomePage() {
  return (
    <>
      <RevealAndLangEffects />

      <nav id="nav">
        <Link href="/" className="nav-logo">
          BriteWorks<em style={{ color: 'var(--accent-warm)', fontStyle: 'italic' }}>.</em>AI
        </Link>
        <ul className="nav-links">
          <li>
            <a href="#works" className="nav-link">
              <span className="ja">制作物</span>
              <span className="en">Works</span>
            </a>
          </li>
          <li>
            <a href="#experiments" className="nav-link">
              <span className="ja">実験</span>
              <span className="en">Experiments</span>
            </a>
          </li>
          <li>
            <a href="#skills" className="nav-link">
              <span className="ja">スキル</span>
              <span className="en">Skills</span>
            </a>
          </li>
          <li>
            <a href="#about" className="nav-link">
              <span className="ja">プロフィール</span>
              <span className="en">About</span>
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-link">
              <span className="ja">連絡先</span>
              <span className="en">Contact</span>
            </a>
          </li>
        </ul>
        <button type="button" className="lang-toggle">
          EN
        </button>
      </nav>

      <header className="hero">
        <div className="hero-text">
          <p className="hero-eyebrow">
            <span className="ja">AIデベロッパー &amp; UXコンサルタント</span>
            <span className="en">AI Developer &amp; UX Consultant</span>
          </p>
          <h1 className="hero-title">
            UX design,<br />meets <em>AI</em>
            <br />
            implementation.
          </h1>
          <p className="hero-desc">
            <span className="ja">
              BtoB商社でのビジネス経験、UXコンサルとしての設計力、AI実装スキル。三つの軸を掛け合わせ、現場の課題を解決します。
            </span>
            <span className="en">
              Combining BtoB business experience, UX consulting, and AI engineering. End-to-end
              implementations grounded in real operational needs.
            </span>
          </p>
          <div className="hero-meta">
            <div className="hero-meta-item">
              <span className="label">Focus</span>
              <span className="value">AI Workflow / RAG</span>
            </div>
            <div className="hero-meta-item">
              <span className="label">Stack</span>
              <span className="value">Dify · n8n · Python</span>
            </div>
            <div className="hero-meta-item">
              <span className="label">Based in</span>
              <span className="value">Japan</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="pipeline-card">
            <p className="pipeline-label">inquiry-automation pipeline</p>

            <div className="pipeline-step">
              <div className="pipeline-dot" />
              <span className="pipeline-step-name">Webhook / Form</span>
              <span className="pipeline-step-tech">CF7 / n8n</span>
            </div>
            <div className="pipeline-arrow">↓</div>
            <div className="pipeline-step">
              <div className="pipeline-dot" />
              <span className="pipeline-step-name">LLM 分類・返信文生成</span>
              <span className="pipeline-step-tech">Claude API</span>
            </div>
            <div className="pipeline-arrow">↓</div>
            <div className="pipeline-step">
              <div className="pipeline-dot" />
              <span className="pipeline-step-name">Gmail 下書き保存</span>
              <span className="pipeline-step-tech">GAS</span>
            </div>
            <div className="pipeline-arrow">↓</div>
            <div className="pipeline-step">
              <div className="pipeline-dot" />
              <span className="pipeline-step-name">Slack 通知</span>
              <span className="pipeline-step-tech">Slack API</span>
            </div>

            <div className="pipeline-divider" />
            <p className="pipeline-label">podtube-pipeline</p>

            <div className="pipeline-step">
              <div className="pipeline-dot" />
              <span className="pipeline-step-name">YouTube 収集</span>
              <span className="pipeline-step-tech">crawl.py</span>
            </div>
            <div className="pipeline-arrow">↓</div>
            <div className="pipeline-step">
              <div className="pipeline-dot" />
              <span className="pipeline-step-name">Whisper 文字起こし</span>
              <span className="pipeline-step-tech">faster-whisper</span>
            </div>
            <div className="pipeline-arrow">↓</div>
            <div className="pipeline-step">
              <div className="pipeline-dot" />
              <span className="pipeline-step-name">ローカル LLM 解析</span>
              <span className="pipeline-step-tech">Ollama / Gemini</span>
            </div>
            <div className="pipeline-arrow">↓</div>
            <div className="pipeline-step">
              <div className="pipeline-dot" />
              <span className="pipeline-step-name">DB 保存</span>
              <span className="pipeline-step-tech">Supabase</span>
            </div>
          </div>
        </div>
      </header>

      <section id="works" className="container">
        <div className="section-head reveal">
          <span className="section-num">01 — Works</span>
          <div>
            <h2 className="section-title">
              Selected <em>projects.</em>
            </h2>
            <p className="section-intro">
              <span className="ja">
                業務課題から逆算したAI実装。Difyを軸に、n8n・GAS・Pythonを組み合わせた現場運用に耐えるシステム。
              </span>
              <span className="en">
                AI implementations engineered from operational needs. Built on Dify, orchestrated with n8n,
                GAS and Python.
              </span>
            </p>
          </div>
        </div>

        <div className="works">
          <Link href="/works/inquiry-automation" className="work-card reveal">
            <div className="work-thumb">
              <svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="35" height="22" />
                <line x1="45" y1="21" x2="55" y2="21" />
                <polyline points="51,17 55,21 51,25" />
                <rect x="55" y="10" width="35" height="22" />
                <line x1="50" y1="32" x2="50" y2="48" />
                <polyline points="46,44 50,48 54,44" />
                <rect x="25" y="48" width="50" height="22" />
                <circle cx="35" cy="59" r="2" />
                <circle cx="45" cy="59" r="2" />
                <circle cx="55" cy="59" r="2" />
              </svg>
            </div>
            <div className="work-meta">
              <span className="work-num">N° 01</span>
              <span className="work-cat">Automation</span>
            </div>
            <h3 className="work-title">
              <em>Inquiry</em> Automation Pipeline
            </h3>
            <p className="work-sub">inquiry-automation</p>
            <div className="work-cta">
              <span>
                <span className="ja">詳細を見る</span>
                <span className="en">View case</span>
              </span>
              <span className="arrow">→</span>
            </div>
          </Link>

          <Link href="/works/podtube-pipeline" className="work-card reveal">
            <div className="work-thumb">
              <svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="14" width="80" height="40" />
                <polygon points="42,28 42,46 56,37" />
                <line x1="10" y1="62" x2="90" y2="62" />
                <line x1="20" y1="68" x2="35" y2="68" />
                <line x1="40" y1="68" x2="60" y2="68" />
                <line x1="65" y1="68" x2="80" y2="68" />
              </svg>
            </div>
            <div className="work-meta">
              <span className="work-num">N° 02</span>
              <span className="work-cat">Pipeline</span>
            </div>
            <h3 className="work-title">
              YouTube <em>AI</em> Pipeline
            </h3>
            <p className="work-sub">podtube-pipeline</p>
            <div className="work-cta">
              <span>
                <span className="ja">詳細を見る</span>
                <span className="en">View case</span>
              </span>
              <span className="arrow">→</span>
            </div>
          </Link>

          <Link href="/works/faq-rag" className="work-card reveal">
            <div className="work-thumb">
              <svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
                <rect x="14" y="14" width="36" height="50" />
                <line x1="20" y1="22" x2="44" y2="22" />
                <line x1="20" y1="28" x2="44" y2="28" />
                <line x1="20" y1="34" x2="38" y2="34" />
                <line x1="20" y1="42" x2="44" y2="42" />
                <line x1="20" y1="48" x2="40" y2="48" />
                <circle cx="70" cy="40" r="14" />
                <circle cx="70" cy="40" r="3" />
                <line x1="80" y1="50" x2="88" y2="58" />
              </svg>
            </div>
            <div className="work-meta">
              <span className="work-num">N° 03</span>
              <span className="work-cat">RAG</span>
            </div>
            <h3 className="work-title">
              Internal FAQ <em>RAG</em> Chatbot
            </h3>
            <p className="work-sub">dify · cohere reranking</p>
            <div className="work-cta">
              <span>
                <span className="ja">詳細を見る</span>
                <span className="en">View case</span>
              </span>
              <span className="arrow">→</span>
            </div>
          </Link>
        </div>
      </section>

      <section id="experiments" className="container">
        <div className="section-head reveal">
          <span className="section-num">02 — Experiments</span>
          <div>
            <h2 className="section-title">
              Tiny <em>experiments.</em>
            </h2>
            <p className="section-intro">
              <span className="ja">
                実装途中のプロトタイプや、小さなアイデアの実験場。UI から試せるものは順次バックエンドと繋げています。
              </span>
              <span className="en">
                Portfolio-adjacent prototypes — tighter tiles than Works (desktop band tops out at five) with
                backends swapped in later.
              </span>
            </p>
          </div>
        </div>

        <div className="experiments-grid">
          <Link href="/experiments/youtube-summary" className="experiment-card reveal">
            <div className="experiment-thumb">
              <svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="12" y="18" width="76" height="44" rx="2" />
                <polygon points="44,34 44,54 62,44" stroke="none" fill="currentColor" />
                <line x1="12" y1="72" x2="88" y2="72" />
                <line x1="18" y1="76" x2="82" y2="76" strokeDasharray="3 4" opacity="0.55" />
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
        </div>

        <p className="experiments-more reveal">
          <Link href="/experiments">
            <span className="ja">実験一覧ページ</span>
            <span className="en">Experiment index</span>
          </Link>
        </p>
      </section>

      <section id="skills" className="container">
        <div className="section-head reveal">
          <span className="section-num">03 — Skills</span>
          <div>
            <h2 className="section-title">
              <em>Capabilities.</em>
            </h2>
            <p className="section-intro">
              <span className="ja">
                調査・設計・実装・運用までの一気通貫。AIに偏らず、UX設計や業務フロー再設計を含む全工程に対応。
              </span>
              <span className="en">
                Research through deployment. Equal attention to AI engineering, UX design and operational
                workflow redesign.
              </span>
            </p>
          </div>
        </div>

        <div className="skills-grid">
          <div className="skill-block reveal">
            <p className="skill-block-title">— AI / LLM</p>
            <ul>
              <li>Dify (self-hosted)</li>
              <li>Claude API · Gemini API</li>
              <li>RAG設計・チューニング</li>
              <li>Cohere Reranking</li>
              <li>Ollama (Local LLM)</li>
            </ul>
          </div>
          <div className="skill-block reveal">
            <p className="skill-block-title">— Automation</p>
            <ul>
              <li>n8n</li>
              <li>Google Apps Script</li>
              <li>GitHub Actions</li>
              <li>Webhook / API</li>
              <li>Slack · Gmail</li>
            </ul>
          </div>
          <div className="skill-block reveal">
            <p className="skill-block-title">— Development</p>
            <ul>
              <li>Python</li>
              <li>WordPress / PHP</li>
              <li>HTML / CSS / JS</li>
              <li>Supabase</li>
              <li>VPS構築・運用</li>
            </ul>
          </div>
          <div className="skill-block reveal">
            <p className="skill-block-title">— UX / Business</p>
            <ul>
              <li>UXコンサルティング</li>
              <li>ユーザーインタビュー</li>
              <li>ジャーニーマッピング</li>
              <li>BtoB業務理解</li>
              <li>AI業務改善提案</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="about" className="container">
        <div className="section-head reveal">
          <span className="section-num">04 — About</span>
          <div>
            <h2 className="section-title">
              <em>About.</em>
            </h2>
          </div>
        </div>

        <div className="about-grid">
          <div className="about-text reveal">
            <p>
              <span className="ja">
                <strong>UX設計・AI実装・ビジネス検証</strong>
                を一人で回せることが強み。BtoB商社で培ったビジネス感覚、UXコンサルとしての要件定義力、そしてAIエンジニアリングを掛け合わせる。
              </span>
              <span className="en">
                My strength is handling <strong>UX design, AI implementation, and business validation</strong>{' '}
                end-to-end. I bring BtoB experience, UX consulting and AI engineering — working as one practice.
              </span>
            </p>
            <p>
              <span className="ja">
                現在はDifyをメインプラットフォームに、n8n・GAS・Pythonを組み合わせて中小企業のAI業務自動化を支援。
              </span>
              <span className="en">
                Currently focused on AI workflow automation with Dify as the main platform — orchestrated with
                n8n, GAS and Python.
              </span>
            </p>
            <p>
              <span className="ja">
                「AI導入の入り口がわからない」企業に対し、現場に即した小さな最初の一歩を提案することを得意とする。
              </span>
              <span className="en">
                Specialized in pragmatic first steps for organizations that want to adopt AI but don&apos;t know
                where to begin.
              </span>
            </p>
          </div>

          <div className="reveal">
            <div className="spec-section">
              <div className="spec-row">
                <span className="spec-label">Background</span>
                <span className="spec-value">
                  <span className="ja">BtoB商社 → UXコンサル → AI開発</span>
                  <span className="en">BtoB Trading → UX Consulting → AI Dev</span>
                </span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Focus</span>
                <span className="spec-value">
                  <span className="ja">AI業務自動化 · RAG実装 · ワークフロー設計</span>
                  <span className="en">AI Automation · RAG · Workflow Design</span>
                </span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Tools</span>
                <span className="spec-value">Dify · n8n · Claude API · Python · GAS</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Languages</span>
                <span className="spec-value">
                  <span className="ja">日本語 (Native) · English</span>
                  <span className="en">Japanese (Native) · English</span>
                </span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Available</span>
                <span className="spec-value">
                  <span className="ja">副業・業務委託 受付中</span>
                  <span className="en">Open to freelance / contract</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-inner">
          <div>
            <p className="contact-eyebrow">— 05 / Contact</p>
            <h2 className="contact-title">
              Let&apos;s <em>build</em> it.
            </h2>
          </div>
          <div>
            <p className="contact-desc">
              <span className="ja">
                AI導入のご相談、業務自動化のご提案、制作のご依頼など。一通のメールから、お気軽にどうぞ。
              </span>
              <span className="en">
                For AI implementation consulting, automation proposals, or project inquiries — feel free to
                reach out.
              </span>
            </p>
            <a
              href="https://forms.gle/oMqXbGdAaw5aK77K9"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span className="ja">メールを送る</span>
              <span className="en">Send a message</span>
              <span>→</span>
            </a>
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
