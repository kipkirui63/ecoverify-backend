import type { ProductRecord, VerificationReport } from '../../types/app'
import { IconAlertTriangle, IconCheckCircle, IconClock, IconEye, IconShield, IconSparkles } from '../ui/Icons'

type ActivityItem = {
  title: string
  detail: string
  when: string
}

function DashboardPage({
  merchantName,
  report,
  totalClaimsSubmitted,
  queue,
  activity,
  onStartVerification,
}: {
  merchantName: string
  report: VerificationReport
  totalClaimsSubmitted: number
  queue: ProductRecord[]
  activity: ActivityItem[]
  onStartVerification: () => void
}) {
  const isNewUser = totalClaimsSubmitted === 0
  const verifiedCount = queue.filter((item) => item.status === 'Verified').length
  const reviewCount = queue.filter((item) => item.status === 'In Review').length
  const flaggedCount = queue.filter((item) => item.status === 'Flagged').length
  const completionRate = queue.length > 0 ? Math.round((verifiedCount / queue.length) * 100) : 0

  const badgeTone =
    report.badgeTier === 'Gold'
      ? 'border-[#d6b04f] bg-[#fff7df] text-[#8b6508]'
      : report.badgeTier === 'Silver'
        ? 'border-[#cbd5e1] bg-[#f8fafc] text-[#475569]'
        : 'border-[#f0c9a3] bg-[#fff4e8] text-[#9c4f19]'

  const statusTone =
    report.status === 'Verified'
      ? 'bg-[#dff3e7] text-[#1f5137]'
      : report.status === 'In Review'
        ? 'bg-[#edf2ff] text-[#42526b]'
        : 'bg-[#fff0e2] text-[#9c4f19]'

  if (isNewUser) {
    return (
      <section className="space-y-6">
        <header className="overflow-hidden rounded-[32px] border border-[#d9e5dd] bg-[radial-gradient(circle_at_top_left,_rgba(140,180,158,0.22),_transparent_34%),linear-gradient(135deg,_#fbfdfb_0%,_#f1f7f3_58%,_#f8fbf9_100%)] p-6 shadow-[0_28px_70px_rgba(22,56,41,0.08)] sm:p-8 lg:p-10">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mt-6 font-['DM_Serif_Display',serif] text-4xl leading-[1.02] text-[#163829] sm:text-5xl lg:text-6xl">
              Welcome, {merchantName}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#52796f] sm:text-base">
              Start your first verification to create a trust badge for your product.
            </p>

            <div className="mt-8">
              <button
                type="button"
                onClick={onStartVerification}
                className="inline-flex items-center gap-2 rounded-xl bg-[#163829] px-6 py-3.5 text-sm font-medium text-white shadow-[0_12px_30px_rgba(22,56,41,0.18)] transition-colors hover:bg-[#112c21]"
              >
                <IconSparkles size={16} />
                <span>Start Verification</span>
              </button>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-white/80 bg-white/85 p-5 backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6d8c7e]">
                  Verified
                </p>
                <p className="mt-3 text-3xl font-bold text-[#163829]">0</p>
              </article>
              <article className="rounded-2xl border border-white/80 bg-white/85 p-5 backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6d8c7e]">
                  In Review
                </p>
                <p className="mt-3 text-3xl font-bold text-[#163829]">0</p>
              </article>
              <article className="rounded-2xl border border-white/80 bg-white/85 p-5 backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6d8c7e]">
                  Badges Live
                </p>
                <p className="mt-3 text-3xl font-bold text-[#163829]">0</p>
              </article>
            </div>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[28px] border border-[#d9e5dd] bg-white p-6 shadow-sm sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6d8c7e]">
              First step
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#163829]">Upload proof for one product</h2>
            <p className="mt-3 max-w-lg text-sm leading-7 text-[#52796f]">
              Add invoices, certificates, or shipment records. Once you submit, this dashboard
              will start showing badge status and review progress.
            </p>
          </article>

          <article className="rounded-[28px] border border-[#d9e5dd] bg-white p-6 shadow-sm sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6d8c7e]">
              What appears next
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl bg-[#f5f8f6] px-4 py-3 text-sm text-[#315948]">
                Your verification queue
              </div>
              <div className="rounded-2xl bg-[#f5f8f6] px-4 py-3 text-sm text-[#315948]">
                Badge status
              </div>
              <div className="rounded-2xl bg-[#f5f8f6] px-4 py-3 text-sm text-[#315948]">
                Recent activity
              </div>
            </div>
          </article>
        </section>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <header className="overflow-hidden rounded-[32px] border border-[#d9e5dd] bg-[radial-gradient(circle_at_top_left,_rgba(140,180,158,0.35),_transparent_32%),linear-gradient(135deg,_#f9fcf8_0%,_#edf4ef_55%,_#f7faf8_100%)] p-6 shadow-[0_28px_70px_rgba(22,56,41,0.10)] sm:p-8 lg:p-10">
        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="mt-5 max-w-3xl font-['DM_Serif_Display',serif] text-4xl leading-[1.02] text-[#163829] sm:text-5xl lg:text-6xl">
              Your trust operations start here.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#52796f] sm:text-base">
              Track pending verifications, spot anything slipping into review, and launch the next
              proof submission without digging through the product catalog.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onStartVerification}
                className="inline-flex items-center gap-2 rounded-xl bg-[#163829] px-5 py-3 text-sm font-medium text-white shadow-[0_12px_30px_rgba(22,56,41,0.18)] transition-colors hover:bg-[#112c21]"
              >
                <IconSparkles size={16} />
                <span>Start New Verification</span>
              </button>
              <div className="inline-flex items-center gap-2 rounded-xl border border-[#d5e1da] bg-white/85 px-4 py-3 text-sm text-[#426451]">
                <IconEye size={16} />
                <span>{report.widgetStatus} storefront status</span>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-white/80 bg-white/80 p-4 backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6d8c7e]">
                  In review now
                </p>
                <p className="mt-3 text-3xl font-bold text-[#163829]">{reviewCount + flaggedCount}</p>
              </article>

              <article className="rounded-2xl border border-white/80 bg-white/80 p-4 backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6d8c7e]">
                  Verified rate
                </p>
                <p className="mt-3 text-3xl font-bold text-[#163829]">{completionRate}%</p>
              </article>

              <article className="rounded-2xl border border-white/80 bg-white/80 p-4 backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6d8c7e]">
                  Next refresh
                </p>
                <p className="mt-3 text-2xl font-bold text-[#163829]">{report.nextRefreshDue}</p>
              </article>
            </div>
          </div>

          <aside className="grid gap-4 self-start">
            <article className="rounded-[28px] bg-[#163829] p-6 text-white shadow-[0_24px_50px_rgba(22,56,41,0.22)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#9dc3af]">
                    Live badge
                  </p>
                  <h2 className="mt-2 text-3xl font-bold">{report.badgeTier}</h2>
                </div>
                <div className={`rounded-full border px-3 py-1 text-xs font-semibold ${badgeTone}`}>
                  {report.badgeTier}
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-white/10 p-4">
                <div className="flex items-center gap-2 text-sm text-[#d6ebdf]">
                  <IconShield size={16} />
                  <span>{report.status}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#d6ebdf]">{report.badgeMessage}</p>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#9dc3af]">
                    Consumer lift
                  </p>
                  <p className="mt-2 text-xl font-semibold">{report.conversionLift}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#9dc3af]">
                    Confidence
                  </p>
                  <p className="mt-2 text-xl font-semibold">{report.confidenceScore}</p>
                </div>
              </div>
            </article>

            <article className="rounded-[28px] border border-[#dae6de] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-[#163829]">Verification health</p>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone}`}>
                  {report.status}
                </span>
              </div>

              <div className="mt-5 grid gap-3">
                <div className="flex items-center justify-between rounded-2xl bg-[#f4f8f5] px-4 py-3">
                  <span className="text-sm text-[#52796f]">Verified</span>
                  <strong className="text-[#163829]">{verifiedCount}</strong>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-[#f4f8f5] px-4 py-3">
                  <span className="text-sm text-[#52796f]">In review</span>
                  <strong className="text-[#163829]">{reviewCount}</strong>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-[#f4f8f5] px-4 py-3">
                  <span className="text-sm text-[#52796f]">Flagged</span>
                  <strong className="text-[#163829]">{flaggedCount}</strong>
                </div>
              </div>
            </article>
          </aside>
        </div>
      </header>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[28px] border border-[#d9e5dd] bg-white p-6 shadow-sm sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6d8c7e]">
                Verification queue
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[#163829]">What needs attention next</h2>
            </div>
            <div className="rounded-full border border-[#d9e5dd] bg-[#f7faf8] px-4 py-2 text-sm text-[#52796f]">
              {totalClaimsSubmitted} total claims
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {queue.slice(0, 4).map((item, index) => {
              const queueTone =
                item.status === 'Verified'
                  ? 'border-[#dfeee5] bg-[#f6fbf7]'
                  : item.status === 'In Review'
                    ? 'border-[#d9e2ff] bg-[#f5f7ff]'
                    : 'border-[#f7d9c2] bg-[#fff7f0]'

              const queueBadgeTone =
                item.status === 'Verified'
                  ? 'bg-[#dff3e7] text-[#1f5137]'
                  : item.status === 'In Review'
                    ? 'bg-[#e9efff] text-[#42526b]'
                    : 'bg-[#ffe7d2] text-[#9c4f19]'

              return (
                <article
                  key={`${item.name}-${item.date}`}
                  className={`rounded-2xl border p-4 transition-transform hover:-translate-y-0.5 ${queueTone}`}
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-sm font-semibold text-[#163829] shadow-sm">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-semibold text-[#163829]">{item.name}</h3>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${queueBadgeTone}`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-[#52796f]">
                          {item.category} claim • last activity {item.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-[#52796f]">
                      <span className="rounded-full bg-white px-3 py-1">
                        {item.badgeTier ? `${item.badgeTier} badge` : 'Badge pending'}
                      </span>
                      <span>
                        {item.status === 'Verified'
                          ? 'Ready for storefront display'
                          : item.status === 'In Review'
                            ? 'Waiting on system review'
                            : 'Needs manual follow-up'}
                      </span>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </article>

        <div className="grid gap-4">
          <article className="rounded-[28px] border border-[#d9e5dd] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-[#163829]">
              <IconCheckCircle size={18} />
              <h2 className="text-lg font-bold">Trust pulse</h2>
            </div>
            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl bg-[#f4f8f5] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6d8c7e]">
                  Widget state
                </p>
                <p className="mt-2 text-base font-semibold text-[#163829]">{report.widgetStatus}</p>
              </div>
              <div className="rounded-2xl bg-[#f4f8f5] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6d8c7e]">
                  Store sync
                </p>
                <p className="mt-2 text-base font-semibold text-[#163829]">{report.storeSyncStatus}</p>
              </div>
              <div className="rounded-2xl bg-[#f4f8f5] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6d8c7e]">
                  Integrity rate
                </p>
                <p className="mt-2 text-base font-semibold text-[#163829]">{report.integrityRate}</p>
              </div>
            </div>
          </article>

          <article className="rounded-[28px] border border-[#d9e5dd] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-[#163829]">
              {flaggedCount > 0 ? <IconAlertTriangle size={18} /> : <IconClock size={18} />}
              <h2 className="text-lg font-bold">Latest movement</h2>
            </div>

            <div className="mt-5 space-y-3">
              {activity.slice(0, 3).map((item) => (
                <article key={`${item.title}-${item.when}`} className="rounded-2xl bg-[#f8fbf9] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-semibold text-[#163829]">{item.title}</h3>
                    <span className="shrink-0 text-xs font-medium text-[#6d8c7e]">{item.when}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#52796f]">{item.detail}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
      </section>
    </section>
  )
}

export default DashboardPage
