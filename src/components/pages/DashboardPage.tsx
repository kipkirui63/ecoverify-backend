import type { ProductRecord, VerificationReport } from '../../types/app'
import { IconCheckCircle, IconClock, IconGlobe, IconShield, IconSparkles } from '../ui/Icons'
import PageHeader from '../ui/PageHeader'
import ProductTable from '../ui/ProductTable'

function DashboardPage({
  onNewVerification,
  stats,
  rows,
  report,
}: {
  onNewVerification: () => void
  stats: Array<{ label: string; value: string; icon: 'check' | 'clock' | 'globe' }>
  rows: ProductRecord[]
  report: VerificationReport
}) {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Manage your verified products, dynamic badges, and consumer trust signals."
        onNewVerification={onNewVerification}
      />

      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-xl border border-[#d8e2dc] bg-white p-5 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-[#52796f]">{stat.label}</span>
              <span className="text-[#52796f]">
                {stat.icon === 'check' && <IconCheckCircle size={20} />}
                {stat.icon === 'clock' && <IconClock size={20} />}
                {stat.icon === 'globe' && <IconGlobe size={20} />}
              </span>
            </div>
            <p className="text-3xl font-bold text-[#1b4332]">{stat.value}</p>
          </article>
        ))}
      </section>

      <section className="mb-8 grid gap-4 lg:grid-cols-3">
        <article className="rounded-xl border border-[#d8e2dc] bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-[#1b4332]">
            <IconSparkles size={16} />
            <h2 className="text-sm font-semibold">Conversion lift target</h2>
          </div>
          <p className="text-3xl font-bold text-[#1b4332]">{report.conversionLift}</p>
          <p className="mt-2 text-sm text-[#52796f]">
            Simulated uplift forecast tied to dynamic badge deployment on the product page.
          </p>
        </article>

        <article className="rounded-xl border border-[#d8e2dc] bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-[#1b4332]">
            <IconShield size={16} />
            <h2 className="text-sm font-semibold">Verification integrity</h2>
          </div>
          <p className="text-3xl font-bold text-[#1b4332]">{report.integrityRate}</p>
          <p className="mt-2 text-sm text-[#52796f]">
            Human-in-the-loop review remains active for flagged or incomplete submissions.
          </p>
        </article>

        <article className="rounded-xl border border-[#d8e2dc] bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-[#1b4332]">
            <IconClock size={16} />
            <h2 className="text-sm font-semibold">Next badge refresh</h2>
          </div>
          <p className="text-2xl font-bold text-[#1b4332]">{report.nextRefreshDue}</p>
          <p className="mt-2 text-sm text-[#52796f]">
            Freshness reminders protect against badge fatigue and keep consumer trust current.
          </p>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-xl border border-[#d8e2dc] bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-5 text-lg font-bold text-[#1b4332]">Recent Products</h2>
          <ProductTable rows={rows.slice(0, 4)} />
        </section>

        <section className="rounded-xl border border-[#d8e2dc] bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 text-lg font-bold text-[#1b4332]">Live trust operations</h2>
          <div className="space-y-4">
            <article className="rounded-lg bg-[#f4f7f5] p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-[#52796f]">Store sync</p>
              <p className="mt-2 text-sm font-medium text-[#1b4332]">{report.storeSyncStatus}</p>
            </article>
            <article className="rounded-lg bg-[#f4f7f5] p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-[#52796f]">Widget status</p>
              <p className="mt-2 text-sm font-medium text-[#1b4332]">{report.widgetStatus}</p>
            </article>
            <article className="rounded-lg bg-[#f4f7f5] p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-[#52796f]">Current badge state</p>
              <p className="mt-2 text-sm font-medium text-[#1b4332]">
                {report.badgeTier} · {report.freshnessLabel}
              </p>
            </article>
          </div>
        </section>
      </section>
    </>
  )
}

export default DashboardPage
