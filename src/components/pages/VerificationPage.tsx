import type { Dispatch, RefObject, SetStateAction } from 'react'
import type { VerificationForm } from '../../types/app'
import CustomSelect from '../ui/CustomSelect'
import FormField from '../ui/FormField'
import FlowProgress from '../ui/FlowProgress'
import { IconFileText, IconImage, IconUpload, IconX } from '../ui/Icons'

function VerificationPage({
  form,
  categories,
  onBack,
  onViewDashboard,
  onChange,
  addFiles,
  removeFile,
  formatSize,
  isDragging,
  setIsDragging,
  handleFileDrop,
  fileInputRef,
  submitVerification,
}: {
  form: VerificationForm
  categories: string[]
  onBack: () => void
  onViewDashboard: () => void
  onChange: <K extends keyof VerificationForm>(key: K, value: VerificationForm[K]) => void
  addFiles: (fileList: FileList | null) => void
  removeFile: (index: number) => void
  formatSize: (bytes: number) => string
  isDragging: boolean
  setIsDragging: Dispatch<SetStateAction<boolean>>
  handleFileDrop: (event: React.DragEvent<HTMLDivElement>) => void
  fileInputRef: RefObject<HTMLInputElement | null>
  submitVerification: (event: React.FormEvent<HTMLFormElement>) => void
}) {
  return (
    <section className="flex min-h-screen w-full items-start justify-center bg-[#f8f9fa] px-4 py-8 sm:px-6 md:px-10">
      <div className="w-full max-w-[1040px]">
        <FlowProgress step={3} totalSteps={4} />
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1b4332] sm:text-3xl">
              New Product Verification
            </h1>
            <p className="text-base text-[#52796f]">{form.productName || 'Organic Hemp Hoodie'}</p>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-[#d8e2dc] bg-white px-4 py-2 text-sm font-medium text-[#1b4332] transition-colors hover:bg-[#f4f7f5]"
          >
            Back
          </button>
        </div>

        <form
          onSubmit={submitVerification}
          className="rounded-xl border border-[#d8e2dc] bg-white p-6 shadow-sm sm:p-8"
        >
              <div className="grid gap-6 md:grid-cols-2">
                <FormField label="Product Name">
                  <input
                    value={form.productName}
                    onChange={(event) => onChange('productName', event.target.value)}
                    className="w-full rounded-lg border border-[#d8e2dc] bg-white px-4 py-3 text-sm text-[#1b4332] outline-none transition-colors focus:border-[#1b4332]"
                  />
                </FormField>

                <CustomSelect
                  label="Sustainability Category"
                  value={form.sustainabilityCategory}
                  options={categories}
                  onChange={(value) => onChange('sustainabilityCategory', value)}
                  placeholder="Select a category"
                />
              </div>

              <div className="mt-8">
                <label className="mb-3 block text-sm font-semibold text-[#1b4332]">
                  Material Invoices &amp; Supply Chain Photos
                </label>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') fileInputRef.current?.click()
                  }}
                  onDragOver={(event) => {
                    event.preventDefault()
                    setIsDragging(true)
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 transition-colors ${
                    isDragging
                      ? 'border-[#1b4332] bg-[#f0f5f2]'
                      : 'border-[#b7c4b8] bg-[#fafcfa] hover:border-[#1b4332] hover:bg-[#f0f5f2]'
                  }`}
                >
                  <div className="mb-3 text-[#52796f]">
                    <IconUpload />
                  </div>
                  <p className="text-sm font-medium text-[#1b4332]">
                    Drop files here or click to browse
                  </p>
                  <p className="mt-1 text-xs text-[#52796f]">PDF, PNG, JPG up to 10MB each</p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  multiple
                  className="hidden"
                  onChange={(event) => {
                    addFiles(event.target.files)
                    event.target.value = ''
                  }}
                />

                {form.files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {form.files.map((file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="flex items-center justify-between rounded-lg border border-[#d8e2dc] bg-[#fafcfa] px-4 py-3"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="text-[#52796f]">
                            {file.type.includes('pdf') ? <IconFileText /> : <IconImage />}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-[#1b4332]">
                              {file.name}
                            </p>
                            <p className="text-xs text-[#52796f]">{formatSize(file.size)}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="ml-2 rounded-full p-1 text-[#52796f] transition-colors hover:bg-[#e8ede9] hover:text-[#1b4332]"
                        >
                          <IconX />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <label className="mt-8 flex items-start gap-3 rounded-lg bg-[#f4f7f5] px-4 py-4 text-sm text-[#315948]">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(event) => onChange('consent', event.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-[#b7c4b8] text-[#1b4332] focus:ring-[#1b4332]"
                />
                <span>
                  I confirm the uploaded documents can be used for verification, redacted consumer evidence display, and controlled audit review.
                </span>
              </label>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={onViewDashboard}
                  className="rounded-lg border border-[#d8e2dc] bg-white px-5 py-3 text-sm font-medium text-[#1b4332] transition-colors hover:bg-[#f4f7f5]"
                >
                  View Dashboard
                </button>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#1b4332] px-8 py-4 text-base font-medium text-white shadow-sm transition-colors hover:bg-[#163829] sm:w-auto"
                >
                  Submit for Audit
                </button>
              </div>
        </form>
      </div>
    </section>
  )
}

export default VerificationPage
