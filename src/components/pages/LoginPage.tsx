import { IconLeaf } from '../ui/Icons'
import FlowProgress from '../ui/FlowProgress'

function LoginPage({
  onBackHome,
  onSubmit,
}: {
  onBackHome: () => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}) {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#f4f7f5] px-4 py-8 sm:px-6 md:px-10">
      <div className="w-full max-w-5xl">
        <FlowProgress step={1} totalSteps={4} />

        <div className="grid overflow-hidden rounded-[24px] border border-[#d8e2dc] shadow-[0_24px_80px_rgba(14,53,40,0.10)] lg:grid-cols-2">

          {/* ── Left: Form panel ── */}
          <div className="flex flex-col justify-between bg-white px-10 py-10 sm:px-12 sm:py-12">

            {/* Brand */}
            <p className="text-[17px] font-semibold tracking-[-0.02em] text-[#1b4332]">
              Eco<span className="text-[#52796f]">Verify</span>
            </p>

            {/* Form body */}
            <div className="my-8 flex-1 py-2">
              <h1 className="font-['DM_Serif_Display',serif] text-[38px] font-normal leading-[1.1] tracking-[-0.02em] text-[#1b4332]">
                Welcome!
              </h1>
              <p className="mt-3 max-w-[260px] text-[13px] leading-relaxed text-[#52796f]">
                Sign in to your merchant account to continue your sustainability verification.
              </p>

              <form onSubmit={onSubmit} className="mt-8 space-y-3">
                <input
                  type="email"
                  placeholder="Your business email"
                  defaultValue="amina@verdantthread.co"
                  className="w-full rounded-[10px] border border-[#d8e2dc] bg-[#f4f7f5] px-4 py-3 text-[13px] text-[#1b4332] placeholder-[#a8bdb4] outline-none transition-colors focus:border-[#1b4332]"
                />
                <div>
                  <input
                    type="password"
                    placeholder="Your password"
                    defaultValue="EcoVerify2026"
                    className="w-full rounded-[10px] border border-[#d8e2dc] bg-[#f4f7f5] px-4 py-3 text-[13px] text-[#1b4332] placeholder-[#a8bdb4] outline-none transition-colors focus:border-[#1b4332]"
                  />
                  <button
                    type="button"
                    className="mt-1.5 block w-full text-right text-[12px] text-[#2d6a4f] transition-opacity hover:opacity-70"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-[10px] bg-[#1b4332] py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#2d6a4f]"
                >
                  Continue to onboarding
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="space-y-1.5 text-center">
              <p className="text-[12px] text-[#52796f]">
                Need help?{' '}
                <a href="mailto:support@ecoverify.co" className="text-[#2d6a4f] hover:underline">
                  support@ecoverify.co
                </a>
              </p>
              <p className="text-[11px] text-[#a8bdb4]">
                All rights reserved EcoVerify Technologies 2026
              </p>
            </div>
          </div>

          {/* ── Right: Image panel ── */}
          <div className="relative flex min-h-[480px] items-center justify-center overflow-hidden p-8">

            {/* Full-bleed background image */}
            <img
              src="/image.png"
              alt="Sustainable product display"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/10" />

            {/* Leaf icon top-right */}
            <div className="absolute right-9 top-9 z-10 flex h-11 w-11 items-center justify-center rounded-[12px] bg-white/15 backdrop-blur-sm">
              <IconLeaf size={20} className="text-white" />
            </div>

            {/* Back button top-left */}
            <button
              type="button"
              onClick={onBackHome}
              aria-label="Go back home"
              className="absolute left-8 top-8 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white/80 backdrop-blur-sm transition-colors hover:bg-white/25 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            {/* Content card — centred */}
            <div className="relative z-10 w-full max-w-[300px] rounded-[14px] border border-white/20 bg-white/10 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.22)] backdrop-blur-md">
              <div className="mb-3 h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />

              <p className="font-['DM_Serif_Display',serif] text-[17px] font-normal leading-[1.25] text-white">
                Sustainability is the new gold standard for commerce
              </p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-white/70">
                Upload proof documents and earn a dynamic trust badge. Verified merchants
                see up to 40% higher conversion from eco-conscious shoppers.
              </p>

              <div className="mt-3 flex items-center gap-1.5">
                <span className="h-1.5 w-5 rounded-full bg-white" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default LoginPage