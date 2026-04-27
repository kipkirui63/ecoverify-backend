function FlowProgress({
  step,
  totalSteps,
}: {
  step: number
  totalSteps: number
}) {
  const progress = Math.round(((step - 1) / (totalSteps - 1)) * 100)

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-[#52796f]">
          Step {step} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-[#52796f]">{progress}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#d8e2dc]">
        <div
          className="h-full rounded-full bg-[#1b4332] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export default FlowProgress
