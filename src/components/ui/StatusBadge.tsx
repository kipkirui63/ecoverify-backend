import { IconCheckCircle, IconClock } from './Icons'
import { IconAlertTriangle } from './Icons'

function StatusBadge({ status }: { status: 'Verified' | 'In Review' | 'Flagged' }) {
  const isVerified = status === 'Verified'
  const isReview = status === 'In Review'

  return (
    <span
      className={`inline-flex items-center gap-[5px] rounded-full px-2.5 py-1 text-xs font-medium ${
        isVerified
          ? 'bg-[#e8f5e9] text-[#1b4332]'
          : isReview
            ? 'bg-[#f0f5f2] text-[#52796f]'
            : 'bg-[#fff4e5] text-[#9c4f19]'
      }`}
    >
      {isVerified ? (
        <IconCheckCircle size={12} />
      ) : isReview ? (
        <IconClock size={12} />
      ) : (
        <IconAlertTriangle size={12} />
      )}
      <span>{status}</span>
    </span>
  )
}

export default StatusBadge
