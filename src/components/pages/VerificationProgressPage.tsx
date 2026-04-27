import { IconLeaf } from '../ui/Icons'

function VerificationProgressPage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#f8f9fa] px-4 py-8 sm:px-6 md:px-10">
      <div className="w-full max-w-xl">
        <article className="rounded-2xl border border-[#d8e2dc] bg-white p-10 text-center shadow-sm sm:p-12">
          <div className="relative mx-auto flex h-40 w-40 items-center justify-center">
            <div className="absolute inset-0 animate-spin rounded-full border-[7px] border-dashed border-[#b7c4b8] border-t-[#1b4332]" />
            <div className="absolute inset-[16px] animate-spin rounded-full border-[4px] border-dashed border-[#dce8e0] border-b-[#52796f] [animation-direction:reverse] [animation-duration:1.8s]" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#1b4332] text-white shadow-[0_14px_30px_rgba(22,56,41,0.16)]">
              <IconLeaf size={34} />
            </div>
          </div>

          <h1 className="mt-8 text-2xl font-bold text-[#1b4332] sm:text-3xl">
            Verification in Progress
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#52796f] sm:text-base">
            We’re checking your proof and preparing your trust badge.
          </p>
        </article>
      </div>
    </section>
  )
}

export default VerificationProgressPage
