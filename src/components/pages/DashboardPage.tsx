import { stats, products } from '../../data/mockData'
import { IconCheckCircle, IconClock, IconGlobe } from '../ui/Icons'
import PageHeader from '../ui/PageHeader'
import ProductTable from '../ui/ProductTable'

function DashboardPage({ onNewVerification }: { onNewVerification: () => void }) {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Manage your verified products and sustainability claims."
        onNewVerification={onNewVerification}
      />

      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-xl border border-[#d8e2dc] bg-white p-5 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-[#52796f]">{stat.label}</span>
              <span className="text-[#52796f]">
                {stat.icon === 'check' && <IconCheckCircle size={20} />}
                {stat.icon === 'clock' && <IconClock size={20} />}
                {stat.icon === 'globe' && <IconGlobe size={20} />}
              </span>
            </div>
            <p className="text-3xl font-bold text-[#1b4332]">{stat.value}</p>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-[#d8e2dc] bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-5 text-lg font-bold text-[#1b4332]">Recent Products</h2>
        <ProductTable rows={products.slice(0, 2)} />
      </section>
    </>
  )
}

export default DashboardPage
