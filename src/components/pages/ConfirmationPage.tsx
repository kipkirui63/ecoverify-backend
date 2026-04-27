import { useMemo, useState } from 'react'
import type { VerificationReport } from '../../types/app'
import EvidenceModal from '../ui/EvidenceModal'
import FlowProgress from '../ui/FlowProgress'
import {
  IconAlertTriangle,
  IconCheckCircle,
  IconCheckMini,
  IconCopy,
  IconEye,
  IconHome,
  IconShield,
  IconSparkles,
} from '../ui/Icons'

function ConfirmationPage({
  copied,
  copyEmbedCode,
  productName,
  category,
  report,
  onGoDashboard,
  onVerifyAnother,
}: {
  copied: boolean
  copyEmbedCode: () => Promise<void>
  productName: string
  category: string
  report: VerificationReport
  onGoDashboard: () => void
  onVerifyAnother: () => void
}) {
  const [modalOpen, setModalOpen] = useState(false)

  const heading = useMemo(() => {
    if (report.status === 'Verified') return 'Product Verified Successfully!'
    if (report.status === 'In Review') return 'Verification Submitted for Review'
    return 'Verification Flagged for Manual Audit'
  }, [report.status])

  const description = useMemo(() => {
    if (report.status === 'Verified') {
      return 'Your sustainability claims have been audited and approved.'
    }
    if (report.status === 'In Review') {
      return 'The upload was received, but more evidence or human review is needed before badge publication.'
    }
    return 'The system found anomalies in the uploaded proof, so the badge is paused until a manual review is completed.'
  }, [report.status])

  const badgeTone =
    report.badgeTier === 'Gold'
      ? 'border-[#c79a2b] text-[#8b6508] bg-[#fff7df]'
      : report.badgeTier === 'Silver'
        ? 'border-[#9ca3af] text-[#475569] bg-[#f8fafc]'
        : 'border-[#f0c98a] text-[#9c4f19] bg-[#fff7ed]'

  return (
    <section className="flex min-h-screen w-full items-start justify-center bg-[#f8f9fa] px-4 py-8 sm:px-6 md:px-10">
      <div className="w-full max-w-6xl">
        <FlowProgress step={4} totalSteps={4} />
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-8 rounded-xl border border-[#d8e2dc] bg-white p-6 text-center shadow-sm sm:p-8">
              <div className={`mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full text-white ${
                report.status === 'Verified'
                  ? 'bg-[#1b4332]'
                  : report.status === 'In Review'
                    ? 'bg-[#52796f]'
                    : 'bg-[#b45309]'
              }`}>
                {report.status === 'Flagged' ? (
                  <IconAlertTriangle size={32} />
                ) : (
                  <IconCheckCircle size={32} />
                )}
              </div>
              <h1 className="mb-2 text-2xl font-bold text-[#1b4332] sm:text-3xl">{heading}</h1>
              <p className="text-base text-[#52796f]">{description}</p>
            </div>

            <section className="rounded-xl border border-[#d8e2dc] bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-4 flex items-center gap-2 text-[#1b4332]">
                <IconSparkles size={16} />
                <h2 className="text-lg font-bold">Verification engine result</h2>
              </div>
              <div className="space-y-3">
                {report.ocrSummary.map((item) => (
                  <article key={item} className="rounded-lg bg-[#f4f7f5] p-4 text-sm text-[#315948]">
                    {item}
                  </article>
                ))}
                {report.anomalies.map((item) => (
                  <article key={item} className="rounded-lg bg-[#fff7ed] p-4 text-sm text-[#9c4f19]">
                    {item}
                  </article>
                ))}
              </div>
            </section>
          </div>

          <div>
            <section className="mb-6 rounded-xl border border-[#d8e2dc] bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-[#1b4332]">Your Dynamic Trust Badge</h2>
                  <p className="mt-1 text-sm text-[#52796f]">{report.badgeMessage}</p>
                </div>
                <div className={`rounded-full border px-3 py-1 text-xs font-semibold ${badgeTone}`}>
                  {report.badgeTier}
                </div>
              </div>

              <div className="mb-6 flex flex-col items-center justify-center rounded-lg bg-[#f4f7f5] py-8">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className={`mb-4 flex h-20 w-20 items-center justify-center rounded-full border-[3px] bg-white ${
                    report.badgeTier === 'Gold'
                      ? 'border-[#c79a2b] text-[#8b6508]'
                      : report.badgeTier === 'Silver'
                        ? 'border-[#94a3b8] text-[#475569]'
                        : 'border-[#f0c98a] text-[#9c4f19]'
                  }`}
                >
                  {report.status === 'Flagged' ? <IconAlertTriangle size={40} /> : <IconCheckCircle size={40} />}
                </button>
                <p className="text-base font-semibold text-[#1b4332]">Eco-Verified</p>
                <p className="mt-0.5 text-sm text-[#52796f]">{category}</p>
                <p className="mt-2 text-xs font-medium text-[#52796f]">{report.freshnessLabel}</p>
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#d8e2dc] bg-white px-4 py-2 text-sm font-medium text-[#1b4332] transition-colors hover:bg-[#f4f7f5]"
                >
                  <IconEye size={14} />
                  View consumer evidence modal
                </button>
              </div>

              <div className="mb-2">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#1b4332]">Embed Code</span>
                  <button
                    type="button"
                    onClick={copyEmbedCode}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#d8e2dc] bg-white px-3 py-1.5 text-xs font-medium text-[#1b4332] transition-colors hover:bg-[#f4f7f5]"
                  >
                    {copied ? <IconCheckMini /> : <IconCopy />}
                    <span>{copied ? 'Copied!' : 'Copy Embed Code'}</span>
                  </button>
                </div>
                <pre className="overflow-x-auto rounded-lg bg-[#1b4332] p-4">
                  <code className="whitespace-pre text-xs leading-relaxed text-[#a7c4b5]">{`<div class="eco-verify-badge" data-product-id="${productName.toLowerCase().replace(/\s+/g, '-')}">
  <img src="https://eco-verify.com/badges/${report.badgeTier.toLowerCase().replace(/\s+/g, '-')}.svg" alt="Eco-Verified: ${report.badgeTier}">
</div>
<script src="https://eco-verify.com/widget.js"></script>`}</code>
                </pre>
              </div>
            </section>

            <section className="mb-6 rounded-xl border border-[#d8e2dc] bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-4 flex items-center gap-2 text-[#1b4332]">
                <IconShield size={16} />
                <h2 className="text-lg font-bold">Storefront proof experience</h2>
              </div>
              <div className="rounded-lg bg-[#f4f7f5] p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#e8ede9]">
                    <span className="text-center text-xs leading-tight text-[#52796f]">
                      Product
                      <br />
                      Image
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#1b4332]">{productName}</p>
                    <p className="mt-0.5 text-xs text-[#52796f]">
                      Click the trust badge to inspect redacted proof, verification date, and audit freshness.
                    </p>
                    <button
                      type="button"
                      onClick={() => setModalOpen(true)}
                      className="mt-2 inline-flex items-center gap-[5px] rounded-full border border-[#d8e2dc] bg-white px-2.5 py-1"
                    >
                      <IconCheckCircle size={14} />
                      <span className="text-xs font-medium text-[#1b4332]">
                        Eco-Verified {report.badgeTier}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8 rounded-xl border border-[#d8e2dc] bg-white p-6 shadow-sm sm:p-8">
              <h2 className="mb-4 text-lg font-bold text-[#1b4332]">Audit trail & accountability</h2>
              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <article className="rounded-lg bg-[#f4f7f5] p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#52796f]">Audit hash</p>
                  <p className="mt-2 font-mono text-sm text-[#1b4332]">{report.auditHash}</p>
                </article>
                <article className="rounded-lg bg-[#f4f7f5] p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#52796f]">Next badge refresh</p>
                  <p className="mt-2 text-sm font-medium text-[#1b4332]">{report.nextRefreshDue}</p>
                </article>
              </div>
              <div className="space-y-3">
                {report.auditTrail.map((item) => (
                  <article key={item.id} className="rounded-lg border border-[#e8ede9] bg-[#fafcfa] px-4 py-4">
                    <div className="mb-1 flex items-center justify-between gap-4">
                      <h3 className="text-sm font-semibold text-[#1b4332]">{item.title}</h3>
                      <span className="text-xs font-medium text-[#52796f]">{item.when}</span>
                    </div>
                    <p className="text-sm text-[#52796f]">{item.detail}</p>
                  </article>
                ))}
              </div>
            </section>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={onGoDashboard}
                className="flex items-center justify-center gap-[5px] rounded-lg bg-[#1b4332] px-8 py-4 text-base font-medium text-white shadow-sm transition-colors hover:bg-[#163829]"
              >
                <IconHome />
                <span>Go to Dashboard</span>
              </button>
              <button
                type="button"
                onClick={onVerifyAnother}
                className="rounded-lg border border-[#d8e2dc] bg-white px-8 py-4 text-base font-medium text-[#1b4332] transition-colors hover:bg-[#f4f7f5]"
              >
                Verify Another Product
              </button>
            </div>
          </div>
        </div>
      </div>

      <EvidenceModal open={modalOpen} report={report} onClose={() => setModalOpen(false)} />
    </section>
  )
}

export default ConfirmationPage
