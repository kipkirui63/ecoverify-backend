import type { VerificationReport } from '../../types/app'
import PageHeader from '../ui/PageHeader'

function HistoryPage({
  onNewVerification,
  events,
  report,
}: {
  onNewVerification: () => void
  events: Array<{ title: string; detail: string; when: string }>
  report: VerificationReport
}) {
  const isEmpty = events.length === 0

  return (
    <>
      <PageHeader
        title="History"
        description="Review recent verification activity, audit milestones, and accountability checkpoints."
        onNewVerification={onNewVerification}
      />

      {isEmpty ? (
        <section className="rounded-xl border border-[#d8e2dc] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold text-[#1b4332]">No activity yet</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#52796f]">
              Verification events and audit history will appear here after your first submission.
            </p>
          </div>
        </section>
      ) : (
        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-xl border border-[#d8e2dc] bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-5 text-lg font-bold text-[#1b4332]">Recent Activity</h2>
            <div className="space-y-4">
              {events.map((event) => (
                <article
                  key={`${event.title}-${event.when}`}
                  className="rounded-lg border border-[#e8ede9] bg-[#fafcfa] px-4 py-4"
                >
                  <div className="mb-1 flex items-center justify-between gap-4">
                    <h3 className="text-sm font-semibold text-[#1b4332]">{event.title}</h3>
                    <span className="text-xs font-medium text-[#52796f]">{event.when}</span>
                  </div>
                  <p className="text-sm text-[#52796f]">{event.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-[#d8e2dc] bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-5 text-lg font-bold text-[#1b4332]">Watermark of Accountability</h2>
            <div className="space-y-4">
              <article className="rounded-lg bg-[#f4f7f5] p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-[#52796f]">Latest audit hash</p>
                <p className="mt-2 font-mono text-sm text-[#1b4332]">{report.auditHash}</p>
              </article>
              {report.auditTrail.map((item) => (
                <article key={item.id} className="rounded-lg bg-[#fafcfa] p-4">
                  <h3 className="text-sm font-semibold text-[#1b4332]">{item.title}</h3>
                  <p className="mt-1 text-sm text-[#52796f]">{item.detail}</p>
                  <p className="mt-2 text-xs font-medium text-[#52796f]">{item.when}</p>
                </article>
              ))}
            </div>
          </section>
        </section>
      )}
    </>
  )
}

export default HistoryPage
