import { IconLeaf } from '../ui/Icons'
import FlowProgress from '../ui/FlowProgress'

function LoginPage({
  onBackHome,
  onSubmit,
  onRegister,
}: {
  onBackHome: () => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onRegister?: () => void
}) {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#f0f4f0] px-4 py-8 sm:px-6 md:px-10">
      <div className="w-full max-w-5xl">
        <FlowProgress step={1} totalSteps={4} />

        <div className="grid overflow-hidden rounded-[24px] border border-[#cdd9d0] shadow-[0_32px_80px_rgba(14,53,40,0.12)] lg:grid-cols-2">

          {/* ── Left: Form panel ── */}
          <div className="flex flex-col bg-white px-10 py-10 sm:px-12 sm:py-12">

            {/* 1. Logo + tagline */}
            <div className="mb-10">
              <div className="flex items-center gap-2.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1b4332] text-white shadow-sm">
  <IconLeaf size={22} />
</div>
                <span className="text-[18px] font-semibold tracking-[-0.03em] text-[#1b4332]">
                  Eco<span className="text-[#52796f]">Verify</span>
                </span>
              </div>
              <p className="mt-2 pl-[55px] text-[11.5px] font-medium tracking-[0.12em] text-[#7a9e8e] uppercase">
                Verify. Badge. Sell.
              </p>
            </div>

            {/* 2. Heading */}
            <div className="mb-8">
              <h1 className="font-['DM_Serif_Display',serif] text-[34px] font-normal leading-[1.1] tracking-[-0.02em] text-[#1b4332]">
                Welcome back.
              </h1>
              <p className="mt-2 text-[13px] leading-relaxed text-[#52796f]">
                Sign in to manage your sustainability profile and trust badges.
              </p>
            </div>

            {/* 3. Form */}
            <form onSubmit={onSubmit} className="flex flex-col gap-4">

              {/* Email */}
              <label className="block">
                <span className="mb-1.5 block text-[12px] font-semibold tracking-[0.04em] text-[#1b4332]">
                  Business Email
                </span>
                <input
                  type="email"
                  placeholder="amina@verdantthread.co"
                  defaultValue="amina@verdantthread.co"
                  className="w-full rounded-[10px] border border-[#cdd9d0] bg-[#f6f9f6] px-4 py-3 text-[13px] text-[#1b4332] placeholder-[#a8bdb4] outline-none transition-colors focus:border-[#1b4332] focus:bg-white"
                />
              </label>

              {/* Password */}
              <label className="block">
                <span className="mb-1.5 block text-[12px] font-semibold tracking-[0.04em] text-[#1b4332]">
                  Password
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  defaultValue="EcoVerify2026"
                  className="w-full rounded-[10px] border border-[#cdd9d0] bg-[#f6f9f6] px-4 py-3 text-[13px] text-[#1b4332] placeholder-[#a8bdb4] outline-none transition-colors focus:border-[#1b4332] focus:bg-white"
                />
              </label>

              {/* Forgot password — sits below the password field, right-aligned */}
              <button
                type="button"
                className="-mt-2 self-end text-[12px] text-[#2d6a4f] transition-opacity hover:opacity-70"
              >
                Forgot password?
              </button>

              {/* Sign In */}
              <button
                type="submit"
                className="w-full rounded-[10px] bg-[#1b4332] py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-[#163829]"
              >
                Sign In
              </button>
            </form>

            {/* 4. Register link */}
            <p className="mt-5 text-center text-[13px] text-[#52796f]">
              New merchant?{' '}
              <button
                type="button"
                onClick={onRegister}
                className="font-semibold text-[#1b4332] underline-offset-2 transition-opacity hover:underline hover:opacity-80"
              >
                Register here
              </button>
            </p>

            {/* 5. Trust statement */}
            <div className="mt-8 flex items-center gap-3 rounded-[10px] bg-[#f0f7f2] px-4 py-3.5">
              <div className="flex shrink-0 -space-x-2">
                {['#2d6a4f', '#52796f', '#74a58a'].map((color, i) => (
                  <div
                    key={i}
                    className="h-7 w-7 rounded-full border-2 border-white"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="text-[12px] leading-snug text-[#2d6a4f]">
                <span className="font-semibold">Join 1,200+ verified</span> sustainable brands already trusted by eco-conscious shoppers.
              </p>
            </div>

            {/* Footer */}
            <p className="mt-8 text-center text-[11px] text-[#a8bdb4]">
              All rights reserved EcoVerify Technologies 2026
            </p>
          </div>

          {/* ── Right: Image panel ── */}
          <div className="relative flex min-h-[520px] items-end overflow-hidden p-8">

            {/* Full-bleed background image */}
            <img
              src="/image.png"
              alt="Sustainable product display"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Gradient overlay — heavier at bottom for card legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/5" />

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

            {/* Content card — pinned to bottom */}
            <div className="relative z-10 w-full rounded-[14px] border border-white/20 bg-white/10 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.25)] backdrop-blur-md">
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