import type { ProductRecord, VerificationReport } from '../../types/app'
import { IconSparkles } from '../ui/Icons'

type ActivityItem = {
  title: string
  detail: string
  when: string
}

const badgeImageByTier = {
  Gold: '/gold1.png',
  Silver: '/silver1.png',
  Bronze: '/bronze2.png',
} as const

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
  const displayName = merchantName.trim() || 'there'
  const verifiedCount = queue.filter((item) => item.status === 'Verified').length
  const reviewCount = queue.filter((item) => item.status === 'In Review').length
  const flaggedCount = queue.filter((item) => item.status === 'Flagged').length
  const currentItem = queue.find((item) => item.status !== 'Verified') ?? queue[0]
  const latestActivity = activity[0]
  const badgeIsLive = report.status !== 'Flagged' && report.storeSyncStatus === 'Connected'
  const actionLabel =
    report.status === 'Flagged'
      ? 'Review issue and re-submit'
      : report.status === 'Verified'
        ? 'No action needed'
        : 'No action needed right now'
  const statusLabel =
    report.status === 'Verified'
      ? 'Verified'
      : report.status === 'Flagged'
        ? 'Action needed'
        : 'In review'
  const badgeStatusLabel = badgeIsLive ? `${report.badgeTier} badge live` : 'Badge not live yet'

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
              Welcome, {displayName}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#52796f] sm:text-base">
              Add your first product and upload proof to begin verification.
            </p>

            <div className="mt-8">
              <button
                type="button"
                onClick={onStartVerification}
                className="inline-flex items-center gap-2 rounded-xl bg-[#163829] px-6 py-3.5 text-sm font-medium text-white shadow-[0_12px_30px_rgba(22,56,41,0.18)] transition-colors hover:bg-[#112c21]"
              >
                <IconSparkles size={16} />
                <span>Add First Product</span>
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
              Add the product details, upload proof documents, and submit for review. Your
              products and badge status will appear here after submission.
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
              Your verification overview
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#52796f] sm:text-base">
              See your current verification status, whether you need to do anything now, and what
              will happen next.
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
                <span>Store sync: {report.storeSyncStatus}</span>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-white/80 bg-white/80 p-4 backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6d8c7e]">
                  Current status
                </p>
                <p className="mt-3 text-3xl font-bold text-[#163829]">{statusLabel}</p>
              </article>

              <article className="rounded-2xl border border-white/80 bg-white/80 p-4 backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6d8c7e]">
                  Action needed
                </p>
                <p className="mt-3 text-2xl font-bold text-[#163829]">{actionLabel}</p>
              </article>

              <article className="rounded-2xl border border-white/80 bg-white/80 p-4 backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6d8c7e]">
                  Last update
                </p>
                <p className="mt-3 text-2xl font-bold text-[#163829]">{latestActivity?.when ?? report.verifiedAt}</p>
              </article>
            </div>
          </div>

          <aside className="grid gap-4 self-start">
            <article className="rounded-[28px] bg-[#163829] p-6 text-white shadow-[0_24px_50px_rgba(22,56,41,0.22)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#9dc3af]">Badge status</p>
                  <h2 className="mt-2 text-3xl font-bold">{badgeStatusLabel}</h2>
                </div>
                <div className={`rounded-full border px-3 py-1 text-xs font-semibold ${badgeTone}`}>
                  {badgeIsLive ? report.badgeTier : report.status}
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-white/10 p-4">
                <img
                  src={badgeImageByTier[report.badgeTier]}
                  alt={`${report.badgeTier} badge`}
                  className="mx-auto h-48 w-full rounded-xl bg-white/5 object-contain p-3"
                />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#9dc3af]">
                    Claim being checked
                  </p>
                  <p className="mt-2 text-xl font-semibold">{currentItem?.category ?? report.category}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#9dc3af]">
                    Product
                  </p>
                  <p className="mt-2 text-xl font-semibold">{currentItem?.name ?? report.productName}</p>
                </div>
              </div>
            </article>

            <article className="rounded-[28px] border border-[#dae6de] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-[#163829]">What happens next</p>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone}`}>
                  {statusLabel}
                </span>
              </div>

              <div className="mt-5 grid gap-3">
                <div className="flex items-center justify-between rounded-2xl bg-[#f4f8f5] px-4 py-3">
                  <span className="text-sm text-[#52796f]">Claims verified</span>
                  <strong className="text-[#163829]">{verifiedCount}</strong>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-[#f4f8f5] px-4 py-3">
                  <span className="text-sm text-[#52796f]">Claims in review</span>
                  <strong className="text-[#163829]">{reviewCount}</strong>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-[#f4f8f5] px-4 py-3">
                  <span className="text-sm text-[#52796f]">Needs attention</span>
                  <strong className="text-[#163829]">{flaggedCount}</strong>
                </div>
              </div>
            </article>
          </aside>
        </div>
      </header>

    </section>
  )
}

export default DashboardPage
