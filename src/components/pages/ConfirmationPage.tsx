import type { VerificationReport } from '../../types/app'
import { IconCheckCircle, IconCopy, IconLock } from '../ui/Icons'

const badgeImageByTier = {
  Gold: '/gold1.png',
  Silver: '/silver1.png',
  Bronze: '/bronze2.png',
} as const

const badgeGallery = [
  { tier: 'Bronze', image: '/bronze2.png' },
  { tier: 'Silver', image: '/silver1.png' },
  { tier: 'Gold', image: '/gold1.png' },
] as const

function ConfirmationPage({
  actionLabel,
  copied,
  copyEmbedCode,
  displayMode = 'confirmation',
  hasBadge,
  merchantName,
  report,
  onGoDashboard,
}: {
  actionLabel: string
  copied: boolean
  copyEmbedCode: () => Promise<void>
  displayMode?: 'confirmation' | 'badge-only'
  hasBadge: boolean
  merchantName: string
  report: VerificationReport
  onGoDashboard: () => void
}) {
  const badgeTone =
    report.badgeTier === 'Gold'
      ? 'border-[#c79a2b] bg-[#fff7df] text-[#8b6508]'
      : report.badgeTier === 'Silver'
        ? 'border-[#9ca3af] bg-[#f8fafc] text-[#475569]'
        : 'border-[#c97b30] bg-[#fff4e8] text-[#9c4f19]'
  const isBadgeOnly = displayMode === 'badge-only'

  if (!hasBadge) {
    return (
      <section className="flex min-h-screen w-full items-start justify-center bg-[#f8f9fa] px-4 py-8 sm:px-6 md:px-10">
        <div className="w-full max-w-3xl">
          <article className="rounded-2xl border border-[#d8e2dc] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#edf4ef] text-[#1b4332]">
                <IconCheckCircle size={30} />
              </div>
              <h1 className="mt-5 text-2xl font-bold text-[#1b4332] sm:text-3xl">
                No badge yet
              </h1>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#52796f] sm:text-base">
                Your first badge will appear here after you complete a verification.
              </p>
              <div className="mt-8 grid w-full gap-4 sm:grid-cols-3">
                {badgeGallery.map((badge) => (
                  <article
                    key={badge.tier}
                    className="overflow-hidden rounded-2xl border border-[#d8e2dc] bg-[#f7faf8]"
                  >
                    <div className="relative">
                      <img
                        src={badge.image}
                        alt={`${badge.tier} badge locked`}
                        className="h-48 w-full object-cover grayscale"
                      />
                      <div className="absolute inset-0 bg-[#163829]/50" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                          <IconLock size={18} />
                        </div>
                        <span className="mt-3 text-sm font-semibold">Locked</span>
                      </div>
                    </div>
                    <div className="px-4 py-3 text-center">
                      <p className="text-sm font-semibold text-[#1b4332]">{badge.tier}</p>
                    </div>
                  </article>
                ))}
              </div>
              <button
                type="button"
                onClick={onGoDashboard}
                className="mt-6 rounded-lg bg-[#1b4332] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#163829]"
              >
                {actionLabel}
              </button>
            </div>
          </article>
        </div>
      </section>
    )
  }

  return (
    <section className="flex min-h-screen w-full items-start justify-center bg-[#f8f9fa] px-4 py-8 sm:px-6 md:px-10">
      <div className="w-full max-w-3xl">
        <article className="rounded-2xl border border-[#d8e2dc] bg-white p-6 shadow-sm sm:p-8">
          {!isBadgeOnly && (
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1b4332] text-white">
                <IconCheckCircle size={32} />
              </div>
              <h1 className="mt-5 text-2xl font-bold text-[#1b4332] sm:text-3xl">
                 Verification Submitted Successfully!
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#52796f] sm:text-base">
                Your proof has been received for {merchantName}. Your sustainability claims have been audited and approved.
              </p>
            </div>
          )}

          <div className="mt-8 space-y-4">
            <section className="rounded-xl border border-[#d8e2dc] bg-[#f8faf8] p-5">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#52796f]">
                {isBadgeOnly ? 'Issued Badge' : 'Your Trust Badge'}
              </p>
              <div className="mt-5 flex flex-col items-center justify-center rounded-xl bg-white p-6 shadow-sm">
                <div className={`rounded-full border px-4 py-1 text-xs font-semibold ${badgeTone}`}>
                  {report.badgeTier}
                </div>
                <img
                  src={badgeImageByTier[report.badgeTier]}
                  alt={`${report.badgeTier} badge`}
                  className="mt-4 h-64 w-full rounded-xl bg-[#f8faf8] object-contain p-3"
                />
                <p className="mt-4 text-lg font-bold text-[#1b4332]">Eco-Verified</p>
                <p className="mt-1 text-sm text-[#52796f]">{report.category}</p>
                <p className="mt-2 text-xs font-medium text-[#52796f]">{report.badgeMessage}</p>
              </div>
            </section>

            {!isBadgeOnly && (
              <section className="rounded-xl border border-[#d8e2dc] bg-white p-5 shadow-sm">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#1b4332]">Badge embed code</p>
                    <p className="mt-1 text-xs text-[#52796f]">
                      Copy this snippet into Shopify or WooCommerce.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmbedCode}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#d8e2dc] bg-white px-3 py-1.5 text-xs font-medium text-[#1b4332] transition-colors hover:bg-[#f4f7f5]"
                  >
                    <IconCopy />
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="overflow-x-auto rounded-lg bg-[#1b4332] p-4">
                  <code className="whitespace-pre text-xs leading-relaxed text-[#a7c4b5]">{`<div class="eco-verify-badge" data-store="${merchantName.toLowerCase().replace(/\s+/g, '-')}" data-tier="${report.badgeTier.toLowerCase()}">
  <img src="https://eco-verify.com/badges/${report.badgeTier.toLowerCase()}.svg" alt="Eco-Verified: ${report.badgeTier}">
</div>
<script src="https://eco-verify.com/widget.js"></script>`}</code>
                </pre>
                <div className="mt-4 rounded-xl bg-[#f5f8f6] p-3">
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={onGoDashboard}
                      className="flex-1 rounded-lg bg-[#1b4332] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#163829]"
                    >
                      {actionLabel}
                    </button>
                  </div>
                </div>
              </section>
            )}
          </div>
        </article>
      </div>
    </section>
  )
}

export default ConfirmationPage
