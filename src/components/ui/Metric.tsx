function Metric({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <article className="text-center">
      <h2 className="mb-2 text-3xl leading-9 font-normal text-[#1b4332]">{value}</h2>
      <p className="text-sm leading-5 text-[#52796f]">{label}</p>
    </article>
  )
}

export default Metric
