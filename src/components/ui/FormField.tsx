import type { ReactNode } from 'react'

function FormField({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="flex flex-col gap-[10px]">
      <span className="text-sm font-semibold text-[#1b4332]">{label}</span>
      {children}
    </label>
  )
}

export default FormField
