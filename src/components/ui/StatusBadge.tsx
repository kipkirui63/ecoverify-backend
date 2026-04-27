import { IconCheckCircle, IconClock } from './Icons'

function StatusBadge({ status }: { status: 'Verified' | 'In Review' }) {
  const isVerified = status === 'Verified'

  return (
    <span
      className={`inline-flex items-center gap-[5px] rounded-full px-2.5 py-1 text-xs font-medium ${
        isVerified ? 'bg-[#e8f5e9] text-[#1b4332]' : 'bg-[#f0f5f2] text-[#52796f]'
      }`}
    >
      {isVerified ? <IconCheckCircle size={12} /> : <IconClock size={12} />}
      <span>{status}</span>
    </span>
  )
}

export default StatusBadge
