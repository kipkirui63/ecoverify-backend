import {
  IconCheckCircle,
  IconCheckMini,
  IconCopy,
  IconHome,
} from '../ui/Icons'

function ConfirmationPage({
  copied,
  copyEmbedCode,
  productName,
  category,
  onGoDashboard,
  onVerifyAnother,
}: {
  copied: boolean
  copyEmbedCode: () => Promise<void>
  productName: string
  category: string
  onGoDashboard: () => void
  onVerifyAnother: () => void
}) {
  return (
    <section className="flex min-h-screen w-full items-start justify-center bg-[#f8f9fa] px-4 py-8 sm:px-6 md:px-10">
      <div className="w-full max-w-[672px]">
        <div className="mb-8 text-center">
          <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#1b4332] text-white">
            <IconCheckCircle size={32} />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-[#1b4332] sm:text-3xl">
            Dynamic Trust Badge Generated
          </h1>
          <p className="text-base text-[#52796f]">
            Your sustainability claim has been reviewed and the storefront badge is ready.
          </p>
        </div>

        <section className="mb-6 rounded-xl border border-[#d8e2dc] bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-6 text-lg font-bold text-[#1b4332]">Your Trust Badge</h2>

          <div className="mb-6 flex flex-col items-center justify-center rounded-lg bg-[#f4f7f5] py-8">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-[#1b4332] bg-white text-[#1b4332]">
              <IconCheckCircle size={40} />
            </div>
            <p className="text-base font-semibold text-[#1b4332]">Eco-Verified</p>
            <p className="mt-0.5 text-sm text-[#52796f]">{category}</p>
          </div>

          <div className="mb-2">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-[#1b4332]">Embed Code</span>
              <button
                type="button"
                onClick={copyEmbedCode}
                className="inline-flex items-center gap-1.5 rounded-md border border-[#d8e2dc] bg-white px-3 py-1.5 text-xs font-medium text-[#1b4332] transition-colors hover:bg-[#f4f7f5]"
              >
                {copied ? <IconCheckMini /> : <IconCopy />}
                <span>{copied ? 'Copied!' : 'Copy Embed Code'}</span>
              </button>
            </div>
            <pre className="overflow-x-auto rounded-lg bg-[#1b4332] p-4">
              <code className="whitespace-pre text-xs leading-relaxed text-[#a7c4b5]">{`<div class="eco-verify-badge" data-product-id="hemp-hoodie-123">
  <img src="https://eco-verify.com/badges/verified.svg" alt="Eco-Verified: 100%">
</div>
<script src="https://eco-verify.com/widget.js"></script>`}</code>
            </pre>
          </div>
        </section>

        <section className="mb-8 rounded-xl border border-[#d8e2dc] bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 text-lg font-bold text-[#1b4332]">How it looks on your product page</h2>
          <div className="flex items-center gap-4 rounded-lg bg-[#f4f7f5] p-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#e8ede9]">
              <span className="text-center text-xs leading-tight text-[#52796f]">
                Product
                <br />
                Image
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#1b4332]">{productName}</p>
              <p className="mt-0.5 text-xs text-[#52796f]">
                Sustainability claim approved and ready for storefront display.
              </p>
              <div className="mt-2 inline-flex items-center gap-[5px] rounded-full border border-[#d8e2dc] bg-white px-2.5 py-1">
                <IconCheckCircle size={14} />
                <span className="text-xs font-medium text-[#1b4332]">Eco-Verified</span>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onGoDashboard}
            className="flex items-center justify-center gap-[5px] rounded-lg bg-[#1b4332] px-8 py-4 text-base font-medium text-white shadow-sm transition-colors hover:bg-[#163829]"
          >
            <IconHome />
            <span>Go to Dashboard</span>
          </button>
          <button
            type="button"
            onClick={onVerifyAnother}
            className="rounded-lg border border-[#d8e2dc] bg-white px-8 py-4 text-base font-medium text-[#1b4332] transition-colors hover:bg-[#f4f7f5]"
          >
            Verify Another Product
          </button>
        </div>
      </div>
    </section>
  )
}

export default ConfirmationPage
