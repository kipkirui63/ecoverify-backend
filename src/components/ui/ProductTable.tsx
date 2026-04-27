import StatusBadge from './StatusBadge'

type ProductRow = {
  name: string
  category: string
  status: 'Verified' | 'In Review'
  date: string
}

function DashboardRow({
  product,
  category,
  status,
  date,
}: {
  product: string
  category: string
  status: 'Verified' | 'In Review'
  date: string
}) {
  return (
    <div className="py-4 sm:grid sm:grid-cols-4 sm:items-center sm:gap-4">
      <div className="mb-2 flex flex-col gap-2 sm:hidden">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[#1b4332]">{product}</span>
          <StatusBadge status={status} />
        </div>
        <div className="flex items-center justify-between text-xs text-[#52796f]">
          <span>{category}</span>
          <span>{date}</span>
        </div>
      </div>

      <span className="hidden text-sm font-medium text-[#1b4332] sm:block">{product}</span>
      <span className="hidden text-sm text-[#52796f] sm:block">{category}</span>
      <div className="hidden sm:block">
        <StatusBadge status={status} />
      </div>
      <span className="hidden text-sm text-[#52796f] sm:block">{date}</span>
    </div>
  )
}

function ProductTable({ rows }: { rows: ProductRow[] }) {
  return (
    <>
      <div className="mb-1 hidden gap-4 border-b border-[#d8e2dc] pb-3 sm:grid sm:grid-cols-4">
        {['Product', 'Category', 'Status', 'Date'].map((header) => (
          <span
            key={header}
            className="text-xs font-semibold tracking-wider text-[#52796f] uppercase"
          >
            {header}
          </span>
        ))}
      </div>

      <div className="divide-y divide-[#e8ede9]">
        {rows.map((row) => (
          <DashboardRow
            key={`${row.name}-${row.date}`}
            product={row.name}
            category={row.category}
            status={row.status}
            date={row.date}
          />
        ))}
      </div>
    </>
  )
}

export default ProductTable
