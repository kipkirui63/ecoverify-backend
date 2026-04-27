import { IconPlus } from './Icons'

function PageHeader({
  title,
  description,
  onNewVerification,
}: {
  title: string
  description: string
  onNewVerification: () => void
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-[#1b4332] sm:text-3xl">{title}</h1>
        <p className="mt-1 text-sm text-[#52796f]">{description}</p>
      </div>
      <button
        type="button"
        onClick={onNewVerification}
        className="hidden rounded-lg bg-[#1b4332] px-5 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#163829] md:inline-flex md:items-center md:gap-2"
      >
        <IconPlus size={16} />
        <span>New Verification</span>
      </button>
    </div>
  )
}

export default PageHeader
