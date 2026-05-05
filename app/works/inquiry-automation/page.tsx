import Link from 'next/link';
import type { Metadata } from 'next';
import { RevealAndLangEffects } from '@/components/RevealAndLangEffects';

export const metadata: Metadata = {
  title: 'Inquiry Automation Pipeline',
};

export default function InquiryAutomationPage() {
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
        <span>Inquiry Automation</span>
      </nav>

      <article className="product">
        <div className="product-visual">
          <svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" aria-label="pipeline diagram">
            <rect x="40" y="30" width="160" height="44" />
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
              WEBHOOK / FORM
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
              CF7  ·  n8n trigger
            </text>
            <line x1="120" y1="74" x2="120" y2="100" />
            <polyline points="116,94 120,102 124,94" />
            <rect x="30" y="102" width="180" height="56" />
            <text
              x="120"
              y="124"
              textAnchor="middle"
              fontSize="9"
              fontFamily="DM Sans"
              fill="currentColor"
              stroke="none"
              letterSpacing="1.5"
            >
              LLM CLASSIFICATION
            </text>
            <text
              x="120"
              y="138"
              textAnchor="middle"
              fontSize="7"
              fontFamily="DM Sans"
              fill="#7A7874"
              stroke="none"
              letterSpacing="1"
            >
              Claude API  ·  reply gen
            </text>
            <circle cx="60" cy="148" r="2" />
            <circle cx="68" cy="148" r="2" />
            <circle cx="76" cy="148" r="2" />
            <line x1="120" y1="158" x2="120" y2="186" />
            <polyline points="116,180 120,188 124,180" />
            <rect x="40" y="188" width="160" height="44" />
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
              GMAIL DRAFT
            </text>
            <text
              x="120"
              y="222"
              textAnchor="middle"
              fontSize="7"
              fontFamily="DM Sans"
              fill="#7A7874"
              stroke="none"
              letterSpacing="1"
            >
              GAS  ·  draft saved
            </text>
            <line x1="120" y1="232" x2="120" y2="258" />
            <polyline points="116,252 120,260 124,252" />
            <rect x="50" y="260" width="140" height="40" />
            <text
              x="120"
              y="278"
              textAnchor="middle"
              fontSize="9"
              fontFamily="DM Sans"
              fill="currentColor"
              stroke="none"
              letterSpacing="1.5"
            >
              SLACK NOTIFY
            </text>
            <text
              x="120"
              y="290"
              textAnchor="middle"
              fontSize="7"
              fontFamily="DM Sans"
              fill="#7A7874"
              stroke="none"
              letterSpacing="1"
            >
              channel: #inquiry
            </text>
          </svg>
          <span className="product-visual-label">Fig. 01.A — system schematic</span>
        </div>

        <div className="product-info">
          <p className="product-cat">— No. 01 / Automation</p>
          <h1 className="product-title">
            <em>Inquiry</em> Automation Pipeline
          </h1>
          <p className="product-sub">inquiry-automation · 2024 — present</p>

          <p className="product-lede">
            <span className="ja">
              受信した問い合わせをLLMで分類・返信文を自動生成し、Gmail下書き保存とSlack通知まで一気通貫で自動化。GASとn8nの2パターンで実装し、要件に応じた使い分けを提案できるよう設計した。
            </span>
            <span className="en">
              An end-to-end pipeline that classifies inbound inquiries, drafts a reply with an LLM, saves it to
              Gmail, and notifies the team in Slack. Built in both GAS and n8n to demonstrate flexible tooling
              decisions.
            </span>
          </p>

          <div className="spec-section">
            <div className="spec-row">
              <span className="spec-label">Type</span>
              <span className="spec-value">
                <span className="ja">業務自動化ワークフロー</span>
                <span className="en">Operational automation workflow</span>
              </span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Role</span>
              <span className="spec-value">
                <span className="ja">設計 · 実装 · 運用</span>
                <span className="en">Design · Implementation · Ops</span>
              </span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Stack</span>
              <span className="spec-value">Claude API · Google Apps Script · n8n · Slack API · Gmail API</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Latency</span>
              <span className="spec-value">≈ 3 — 5 sec / inquiry</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Status</span>
              <span className="spec-value">
                <span className="ja">本番稼働中</span>
                <span className="en">In production</span>
              </span>
            </div>
          </div>

          <div className="swatches">
            <span className="swatch">Claude API</span>
            <span className="swatch">GAS</span>
            <span className="swatch">n8n</span>
            <span className="swatch">Slack</span>
            <span className="swatch">Gmail</span>
          </div>

          <div className="cta-row">
            <a
              href="https://github.com/alien-house/inquiry-automation"
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
                中小企業のBtoB問い合わせは1日10〜30件。担当者が1件ずつ分類し、過去返信を探し、文面を整える時間が積み上がる。
                <strong>定型対応に費やす時間を削り、担当者は判断と提案に集中する</strong> ─ そのための仕組みとして設計。
              </span>
              <span className="en">
                SMB BtoB teams handle 10–30 inquiries per day. Most of the time goes into triage, finding past
                replies, and polishing wording.{' '}
                <strong>Reduce the routine work so the team can focus on judgement and proposals</strong> — that was
                the brief.
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
                  <span className="ja">受信フックの正規化</span>
                  <span className="en">Normalize inbound hook</span>
                </span>
                <span className="tech">CF7 / n8n trigger → JSON payload</span>
              </div>
              <div className="pipeline-step">
                <span className="num">N° 02</span>
                <span className="stage">
                  <span className="ja">LLM分類 · 返信文生成</span>
                  <span className="en">LLM classification & reply</span>
                </span>
                <span className="tech">Claude API · category + draft</span>
              </div>
              <div className="pipeline-step">
                <span className="num">N° 03</span>
                <span className="stage">
                  <span className="ja">Gmail下書き保存</span>
                  <span className="en">Save Gmail draft</span>
                </span>
                <span className="tech">Gmail API via GAS</span>
              </div>
              <div className="pipeline-step">
                <span className="num">N° 04</span>
                <span className="stage">
                  <span className="ja">担当者へSlack通知</span>
                  <span className="en">Notify owner on Slack</span>
                </span>
                <span className="tech">Slack incoming webhook</span>
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
                <span className="ja">
                  分類・返信文作成にかかる手作業を大幅に削減。担当者は確認・送信のみに集中できる構成。
                </span>
                <span className="en">
                  Significantly reduces manual triage and drafting time — the team focuses on review and send only.
                </span>
              </li>
              <li>
                <span className="ja">人手による「最終確認」工程は残し、誤送信リスクを排除。</span>
                <span className="en">A human review step is preserved — drafts are never sent automatically.</span>
              </li>
              <li>
                <span className="ja">GAS版は0コスト、n8n版は分岐拡張性。要件で選択可。</span>
                <span className="en">GAS variant is zero-cost; n8n variant scales branching logic. Pick by need.</span>
              </li>
              <li>
                <span className="ja">プロンプトはカテゴリごとに分離 ─ 後から追加・差し替えできる構成。</span>
                <span className="en">Prompts are split per category, so they can be swapped without redeploy.</span>
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
              YouTube <em>AI</em> Pipeline
            </h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Link href="/works/podtube-pipeline" className="next-link">
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
