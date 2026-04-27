import { useState } from 'react'

function CustomSelect({
  label,
  value,
  options,
  onChange,
  placeholder = 'Select an option',
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
  placeholder?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <label className="block">
      <span className="mb-3 block text-sm font-semibold text-[#1b4332]">{label}</span>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="flex w-full items-center justify-between rounded-lg border border-[#d8e2dc] bg-white px-4 py-3 text-left transition-colors hover:border-[#1b4332] focus:border-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#1b4332]/20"
        >
          <span className={`text-sm ${value ? 'text-[#1b4332]' : 'text-[#8fa89b]'}`}>
            {value || placeholder}
          </span>
          <svg
            className={`h-5 w-5 text-[#52796f] transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <div className="absolute z-10 mt-1 w-full rounded-lg border border-[#d8e2dc] bg-white py-1 shadow-lg">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option)
                  setOpen(false)
                }}
                className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-[#f0f5f2] ${
                  value === option
                    ? 'bg-[#f0f5f2] font-medium text-[#1b4332]'
                    : 'text-[#344e41]'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </label>
  )
}

export default CustomSelect
