import { IconLeaf } from '../ui/Icons'

function LoginPage({
  onBackHome,
  onSubmit,
}: {
  onBackHome: () => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}) {
  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 md:px-10">
      <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[28px] border border-[#d8e2dc] bg-[linear-gradient(180deg,rgba(255,255,252,0.98),rgba(241,245,238,0.94))] p-8 shadow-[0_24px_80px_rgba(14,53,40,0.08)] sm:p-12">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1b4332] text-white">
            <IconLeaf size={22} />
          </div>
          <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-[#52796f] uppercase">
            Merchant Onboarding
          </p>
          <h1 className="max-w-[10ch] text-5xl leading-[0.96] font-semibold tracking-[-0.05em] text-[#1b4332] sm:text-6xl">
            Trust starts with proof.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#52796f]">
            This MVP follows the materials: merchant login, store onboarding, proof upload, and trust badge confirmation for sustainable e-commerce claims.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <article className="rounded-2xl bg-white/70 p-5">
              <strong className="mb-2 block text-3xl text-[#1b4332]">Step 1</strong>
              <span className="text-sm text-[#52796f]">Authenticate the merchant account.</span>
            </article>
            <article className="rounded-2xl bg-white/70 p-5">
              <strong className="mb-2 block text-3xl text-[#1b4332]">Step 2</strong>
              <span className="text-sm text-[#52796f]">Connect store details and sustainability context.</span>
            </article>
            <article className="rounded-2xl bg-white/70 p-5">
              <strong className="mb-2 block text-3xl text-[#1b4332]">Step 3</strong>
              <span className="text-sm text-[#52796f]">Upload evidence and issue a dynamic badge.</span>
            </article>
          </div>
        </article>

        <form
          onSubmit={onSubmit}
          className="rounded-[28px] border border-[#d8e2dc] bg-white p-8 shadow-[0_24px_80px_rgba(14,53,40,0.08)] sm:p-10"
        >
          <p className="text-sm font-medium text-[#52796f]">Login Screen</p>
          <h2 className="mt-2 text-3xl font-bold text-[#1b4332]">Merchant access</h2>
          <p className="mt-3 text-sm leading-6 text-[#52796f]">
            Demo credentials are not validated. This screen exists to satisfy the MVP flow expected in the course brief.
          </p>

          <div className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-3 block text-sm font-semibold text-[#1b4332]">Business Email</span>
              <input
                type="email"
                defaultValue="amina@verdantthread.co"
                className="w-full rounded-lg border border-[#d8e2dc] bg-white px-4 py-3 text-sm text-[#1b4332] outline-none transition-colors focus:border-[#1b4332]"
              />
            </label>

            <label className="block">
              <span className="mb-3 block text-sm font-semibold text-[#1b4332]">Password</span>
              <input
                type="password"
                defaultValue="EcoVerify2026"
                className="w-full rounded-lg border border-[#d8e2dc] bg-white px-4 py-3 text-sm text-[#1b4332] outline-none transition-colors focus:border-[#1b4332]"
              />
            </label>
          </div>

          <div className="mt-6 rounded-xl bg-[#f4f7f5] p-4 text-sm text-[#315948]">
            Only essential merchant contact data is requested in this MVP, matching the brief’s expectation around ethical handling and data minimisation.
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={onBackHome}
              className="rounded-lg border border-[#d8e2dc] bg-white px-5 py-3 text-sm font-medium text-[#1b4332] transition-colors hover:bg-[#f4f7f5]"
            >
              Back Home
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#1b4332] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#163829]"
            >
              Continue to Onboarding
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default LoginPage
