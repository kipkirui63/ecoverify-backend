import type { VerificationReport } from '../../types/app'
import { IconCheckCircle, IconShield, IconX } from './Icons'

function EvidenceModal({
  open,
  report,
  onClose,
}: {
  open: boolean
  report: VerificationReport
  onClose: () => void
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1b4332]/55 px-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-[#d8e2dc] px-6 py-5">
          <div>
            <p className="text-sm font-medium text-[#52796f]">Evidence Modal</p>
            <h3 className="mt-1 text-xl font-bold text-[#1b4332]">
              Consumer proof view for {report.productName}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[#52796f] transition-colors hover:bg-[#f4f7f5] hover:text-[#1b4332]"
          >
            <IconX />
          </button>
        </div>

        <div className="grid gap-6 px-6 py-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section>
            <div className="mb-4 rounded-xl bg-[#f4f7f5] p-4 text-sm text-[#315948]">
              Redacted proof is displayed to build trust without exposing supplier identities or sensitive commercial data.
            </div>
            <div className="space-y-3">
              {report.evidence.map((item) => (
                <article
                  key={item.id}
                  className="rounded-xl border border-[#d8e2dc] bg-[#fafcfa] p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-[#1b4332]">{item.label}</h4>
                    {item.verified && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-[#1b4332]">
                        <IconCheckCircle size={12} />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-medium text-[#52796f]">{item.source}</p>
                  <p className="mt-2 text-sm text-[#315948]">{item.redactedPreview}</p>
                </article>
              ))}
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-xl border border-[#d8e2dc] bg-white p-4">
              <div className="mb-3 flex items-center gap-2 text-[#1b4332]">
                <IconShield size={16} />
                <h4 className="text-sm font-semibold">Verification snapshot</h4>
              </div>
              <dl className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[#52796f]">Badge tier</dt>
                  <dd className="font-medium text-[#1b4332]">{report.badgeTier}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[#52796f]">Verified at</dt>
                  <dd className="font-medium text-[#1b4332]">{report.verifiedAt}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[#52796f]">Next refresh</dt>
                  <dd className="font-medium text-[#1b4332]">{report.nextRefreshDue}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[#52796f]">Audit hash</dt>
                  <dd className="font-mono text-xs font-medium text-[#1b4332]">{report.auditHash}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl border border-[#d8e2dc] bg-white p-4">
              <h4 className="mb-3 text-sm font-semibold text-[#1b4332]">Why this matters</h4>
              <ul className="space-y-2 text-sm text-[#52796f]">
                <li>Consumers can inspect evidence instead of trusting generic green marketing.</li>
                <li>Merchants keep control because supplier names stay redacted.</li>
                <li>Freshness windows show whether proof is current or stale.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default EvidenceModal
