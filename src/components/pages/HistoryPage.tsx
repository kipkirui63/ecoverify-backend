import { historyEvents } from '../../data/mockData'
import PageHeader from '../ui/PageHeader'

function HistoryPage({ onNewVerification }: { onNewVerification: () => void }) {
  return (
    <>
      <PageHeader
        title="History"
        description="Review recent verification activity and audit milestones."
        onNewVerification={onNewVerification}
      />

      <section className="rounded-xl border border-[#d8e2dc] bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-5 text-lg font-bold text-[#1b4332]">Recent Activity</h2>
        <div className="space-y-4">
          {historyEvents.map((event) => (
            <article
              key={event.title}
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
    </>
  )
}

export default HistoryPage
