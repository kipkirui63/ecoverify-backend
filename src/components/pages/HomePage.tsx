import Metric from '../ui/Metric'
import { IconLeaf, IconPlayCircle, IconShopify } from '../ui/Icons'

function HomePage({
  onLogin,
  onOpenDashboard,
}: {
  onLogin: () => void
  onOpenDashboard: () => void
}) {
  return (
    <section className="min-h-screen bg-[#f8fbf8] px-6 py-8 sm:px-10 md:px-16 lg:px-[88px]">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-full bg-[#f8fbf8] px-5 py-3 sm:px-7">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1b4332] text-white shadow-sm">
                <IconLeaf size={22} />
              </div>
              <span className="text-[18px] font-semibold tracking-[-0.03em] text-[#1b4332]">
                Eco<span className="text-[#52796f]">Verify</span>
              </span>
            </div>
            <p className="mt-2 pl-14 text-[11.5px] font-medium uppercase tracking-[0.12em] text-[#7a9e8e]">
              Verify. Badge. Sell.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm text-[#52796f]">
            <button type="button" className="transition-colors hover:text-[#1b4332]">
              How it works
            </button>
            <button type="button" className="transition-colors hover:text-[#1b4332]">
              Pricing
            </button>
            <button type="button" className="transition-colors hover:text-[#1b4332]">
              Brands
            </button>
            <button
              type="button"
              onClick={onLogin}
              className="rounded-full bg-[#1b4332] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#163829]"
            >
              Get started
            </button>
          </div>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center py-16 text-center sm:py-20">
          <header className="max-w-4xl">
            <h1 className="text-center text-5xl leading-[1.08] font-normal tracking-[0] text-[#1b4332] sm:text-6xl sm:leading-[75px]">
              Verified Transparency for 
              <br />
              Sustainable Brands.
            </h1>
            <p className="mt-8 max-w-2xl text-center text-xl leading-8 font-normal tracking-[0] text-[#52796f]">
              Upload proof of origin and generate your Trust Badge in 5 minutes.
            </p>
          </header>

          {/* <section
            aria-label="Core benefits"
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <div className="rounded-full border border-[#d8e2dc] bg-white px-4 py-2 text-sm text-[#315948]">
              Show proof
            </div>
            <div className="rounded-full border border-[#d8e2dc] bg-white px-4 py-2 text-sm text-[#315948]">
              Give trust
            </div>
            <div className="rounded-full border border-[#d8e2dc] bg-white px-4 py-2 text-sm text-[#315948]">
              Publish badges
            </div>
          </section> */}

          <nav
            aria-label="Primary actions"
            className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button
              type="button"
              onClick={onLogin}
              className="inline-flex min-w-[264.65px] items-center justify-center gap-2 rounded-lg bg-[#1b4332] px-8 py-4 text-base leading-6 font-medium tracking-[0] text-white shadow-[0px_4px_6px_-4px_#0000001a,0px_10px_15px_-3px_#0000001a] transition-colors hover:bg-[#163829]"
            >
              <IconShopify />
              <span>Start Verifying Products</span>
            </button>
            <button
              type="button"
              onClick={onOpenDashboard}
              className="inline-flex min-w-[182.06px] items-center justify-center gap-2 rounded-lg border-[1.6px] border-[#1b4332] bg-white px-[34px] py-4 text-base leading-6 font-medium tracking-[0] text-[#1b4332] transition-colors hover:bg-[#f4f7f5]"
            >
              <IconPlayCircle />
              <span>See Live Demo</span>
            </button>
          </nav>

          <section
            aria-label="Key metrics"
            className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8"
          >
            <Metric value="5 min" label="Quick Verification" />
            <Metric value="100%" label="Audit Accuracy" />
            <Metric value="500+" label="Verified Brands" />
          </section>
        </div>

        {/* <section className="relative overflow-hidden rounded-[20px] bg-[#1a3a2a] px-6 py-14 text-center sm:px-10 sm:py-16">
          <div className="pointer-events-none absolute -top-[60px] -right-[60px] h-[220px] w-[220px] rounded-full bg-[rgba(127,185,154,0.08)]" />
          <div className="pointer-events-none absolute -bottom-[40px] -left-[40px] h-[160px] w-[160px] rounded-full bg-[rgba(200,230,212,0.06)]" />

          <span className="relative z-[1] block text-[10px] uppercase tracking-[0.2em] text-[#7fb99a]">
            Start today
          </span>
          <h2 className="relative z-[1] mx-auto mt-6 max-w-[640px] font-['DM_Serif_Display',serif] text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.15] text-[#f5f0e8]">
            Your sustainability story deserves to be seen.
          </h2>
          <p className="relative z-[1] mx-auto mt-6 max-w-[420px] text-sm font-light leading-7 text-[rgba(200,230,212,0.72)]">
            Join sustainable brands building shopper confidence with verified proof, not just
            promises.
          </p>

          <button
            type="button"
            onClick={onLogin}
            className="relative z-[1] mt-10 inline-flex items-center gap-2 rounded-full bg-[#f5f0e8] px-7 py-3.5 text-sm font-medium text-[#1a3a2a] transition-transform hover:-translate-y-0.5 hover:bg-[#fbf7f0]"
          >
            <span>Get started - it&apos;s free</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="#1a3a2a"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </section> */}

        <footer className="mt-10 border-t border-[#d8e2dc] px-5 py-8 sm:px-7">
          <div className="flex flex-col items-center gap-4 text-sm text-[#52796f] sm:flex-row sm:items-center sm:justify-between">
            <span className="font-semibold text-[#1b4332]">EcoVerify</span>
            <div className="flex items-center gap-4">
              <span>Privacy</span>
              <span aria-hidden="true">•</span>
              <span>Terms</span>
              <span aria-hidden="true">•</span>
              <span>Contact</span>
            </div>
            <span>© 2026 EcoVerify</span>
          </div>
        </footer>
      </div>
    </section>
  )
}

export default HomePage
