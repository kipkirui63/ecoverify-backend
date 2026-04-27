import type { ProductRecord } from '../../types/app'
import { IconPlus } from '../ui/Icons'
import PageHeader from '../ui/PageHeader'
import ProductTable from '../ui/ProductTable'

function ProductsPage({
  onNewVerification,
  rows,
}: {
  onNewVerification: () => void
  rows: ProductRecord[]
}) {
  const isEmpty = rows.length === 0

  return (
    <>
      <PageHeader
        title="Products"
        description="View all products, trust badge states, and verification outcomes."
        onNewVerification={onNewVerification}
      />

      <section className="rounded-xl border border-[#d8e2dc] bg-white p-5 shadow-sm sm:p-6">
        {isEmpty ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold text-[#1b4332]">No products yet</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#52796f]">
              Your verified products will appear here after your first submission.
            </p>
            <button
              type="button"
              onClick={onNewVerification}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#1b4332] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#163829]"
            >
              <IconPlus size={16} />
              <span>Start Verification</span>
            </button>
          </div>
        ) : (
          <>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#1b4332]">Product List</h2>
              <button
                type="button"
                onClick={onNewVerification}
                className="inline-flex items-center gap-2 rounded-lg bg-[#1b4332] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#163829]"
              >
                <IconPlus size={16} />
                <span>New Verification</span>
              </button>
            </div>
            <ProductTable rows={rows} />
          </>
        )}
      </section>
    </>
  )
}

export default ProductsPage
