import type { VerificationReport } from '../../types/app'
import { IconAlertTriangle } from '../ui/Icons'

function FailedVerificationPage({
  merchantName,
  report,
  onRetry,
  onGoDashboard,
}: {
  merchantName: string
  report: VerificationReport
  onRetry: () => void
  onGoDashboard: () => void
}) {
  const displayName = merchantName.trim() || 'your business'

  return (
    <section className="flex min-h-screen w-full items-start justify-center bg-[#f8f9fa] px-4 py-8 sm:px-6 md:px-10">
      <div className="w-full max-w-3xl">
        <article className="rounded-2xl border border-[#e7c9b5] bg-white p-6 shadow-sm sm:p-8">
          <div className="rounded-2xl bg-[radial-gradient(circle_at_top,#fff4ec,white_55%)] p-6">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#9c4f19] text-white shadow-sm">
                <IconAlertTriangle size={30} />
              </div>
              <h1 className="mt-5 text-2xl font-bold text-[#1b4332] sm:text-3xl">
                Verification failed
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#52796f] sm:text-base">
                We could not approve the submission for {displayName}. The uploaded proof needs
                manual review before a badge can be issued.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <article className="rounded-xl border border-[#e7ddd7] bg-white p-4 text-center shadow-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-[#52796f]">Status</p>
                <p className="mt-2 text-sm font-semibold text-[#1b4332]">{report.status}</p>
              </article>
              <article className="rounded-xl border border-[#e7ddd7] bg-white p-4 text-center shadow-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-[#52796f]">Product</p>
                <p className="mt-2 text-sm font-semibold text-[#1b4332]">{report.productName}</p>
              </article>
              <article className="rounded-xl border border-[#e7ddd7] bg-white p-4 text-center shadow-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-[#52796f]">Claim</p>
                <p className="mt-2 text-sm font-semibold text-[#1b4332]">{report.category}</p>
              </article>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <section className="rounded-xl border border-[#e7ddd7] bg-[#fffaf6] p-5">
              <h2 className="text-sm font-semibold text-[#1b4332]">Reason for failure</h2>
              <div className="mt-4 space-y-3">
                {report.anomalies.map((item) => (
                  <article key={item} className="rounded-xl border border-[#eedfd5] bg-white p-4">
                    <p className="text-sm leading-6 text-[#315948]">{item}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-[#e7ddd7] bg-white p-5">
              <h2 className="text-sm font-semibold text-[#1b4332]">What to do next</h2>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-[#52796f]">
                <li>Upload a cleaner or final version of the supporting proof document.</li>
                <li>Remove edited, sample, or draft files from the submission.</li>
                <li>Resubmit the product for a fresh verification check.</li>
              </ul>
            </section>

            <div className="flex flex-col gap-3 rounded-xl bg-[#f5f8f6] p-3 sm:flex-row">
              <button
                type="button"
                onClick={onRetry}
                className="flex-1 rounded-lg bg-[#1b4332] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#163829]"
              >
                Upload new evidence
              </button>
              <button
                type="button"
                onClick={onGoDashboard}
                className="flex-1 rounded-lg border border-[#d8e2dc] bg-white px-5 py-3 text-sm font-medium text-[#1b4332] transition-colors hover:bg-[#f4f7f5]"
              >
                Continue to Dashboard
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default FailedVerificationPage
