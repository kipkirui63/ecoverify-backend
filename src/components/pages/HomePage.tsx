import Metric from '../ui/Metric'
import { IconPlayCircle, IconShopify } from '../ui/Icons'

function HomePage({
  onLogin,
  onOpenDashboard,
}: {
  onLogin: () => void
  onOpenDashboard: () => void
}) {
  return (
    <section className="flex min-h-[662.4px] w-full items-center justify-center px-6 py-16 sm:px-10 md:px-16 lg:px-[103.2px]">
      <div className="w-full max-w-[896px]">
        <div className="flex flex-col items-center text-center">
          <header className="max-w-[896px]">
            <h1 className="text-center text-5xl leading-[1.2] font-normal tracking-[0] text-[#1b4332] sm:text-6xl sm:leading-[75px]">
              Verified Transparency for
              <br />
              Sustainable Brands.
            </h1>
            <p className="mt-10 text-center text-xl leading-7 font-normal tracking-[0] text-[#52796f]">
              Upload proof of origin, validate sourcing claims, and generate a live trust badge in minutes.
            </p>
          </header>

          <nav
            aria-label="Primary actions"
            className="mt-[54px] flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button
              type="button"
              onClick={onLogin}
              className="inline-flex min-w-[264.65px] items-center justify-center gap-2 rounded-lg bg-[#1b4332] px-8 py-4 text-base leading-6 font-medium tracking-[0] text-white shadow-[0px_4px_6px_-4px_#0000001a,0px_10px_15px_-3px_#0000001a] transition-colors hover:bg-[#163829]"
            >
              <IconShopify />
              <span>Connect to Shopify</span>
            </button>
            <button
              type="button"
              onClick={onOpenDashboard}
              className="inline-flex min-w-[182.06px] items-center justify-center gap-2 rounded-lg border-[1.6px] border-[#1b4332] bg-white px-[34px] py-4 text-base leading-6 font-medium tracking-[0] text-[#1b4332] transition-colors hover:bg-[#f4f7f5]"
            >
              <IconPlayCircle />
              <span>View Demo</span>
            </button>
          </nav>

          <section
            aria-label="Key metrics"
            className="mt-[74px] grid w-full max-w-[768px] grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8"
          >
            <Metric value="5 min" label="Quick Verification" />
            <Metric value="100%" label="Audit Accuracy" />
            <Metric value="500+" label="Verified Brands" />
          </section>
        </div>
      </div>
    </section>
  )
}

export default HomePage
