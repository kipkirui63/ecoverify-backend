import { useEffect, useMemo, useState } from 'react'
import type { Dispatch, RefObject, SetStateAction } from 'react'
import type { VerificationForm } from '../../types/app'
import CustomSelect from '../ui/CustomSelect'
import FormField from '../ui/FormField'
import FlowProgress from '../ui/FlowProgress'
import {
  IconArrowLeft,
  IconArrowRight,
  IconCheckMini,
  IconFileText,
  IconImage,
  IconUpload,
  IconX,
} from '../ui/Icons'

function VerificationPage({
  form,
  categories,
  countries,
  platforms,
  onBack,
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
  countries: string[]
  platforms: string[]
  onBack: () => void
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
  const verificationHeroImage = '/verification-proof-scene.svg'
  const [step, setStep] = useState(1)
  const [isAnalysing, setIsAnalysing] = useState(false)
  const heroCopyByStep = {
    1: {
      title: 'Define the verification.',
      description:
        'Add the business details and the claim to be checked.',
    },
    2: {
      title: 'Attach the proof.',
      description:
        'Upload the files that support the claim from step 1.',
    },
    3: {
      title: 'Review and submit.',
      description:
        'Check the details and submit the verification.',
    },
  } as const
  const activeHeroCopy = heroCopyByStep[step as 1 | 2 | 3]

  useEffect(() => {
    if (step !== 2 || form.files.length === 0 || !isAnalysing) {
      return
    }

    const timeout = window.setTimeout(() => setIsAnalysing(false), 1200)
    return () => window.clearTimeout(timeout)
  }, [form.files.length, isAnalysing, step])

  const extractedData = useMemo(() => {
    const primaryFile = form.files[0]?.name ?? 'proof-document.pdf'

    return {
      supplierName: `${form.storeName} supplier`,
      documentDate: new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date()),
      materialType: form.sustainabilityCategory || 'Organic Materials',
      fileName: primaryFile,
    }
  }, [form.files, form.storeName, form.sustainabilityCategory])

  function goToStep(nextStep: number) {
    setStep(Math.min(3, Math.max(1, nextStep)))
  }

  function handleWizardSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const canContinueFromStepOne =
      form.storeName.trim() !== '' &&
      form.country.trim() !== '' &&
      form.platform.trim() !== '' &&
      form.sustainabilityCategory.trim() !== ''
    const canContinueFromStepTwo = form.files.length > 0
    const canSubmit = form.consent

    if (step === 1 && !canContinueFromStepOne) return
    if (step === 2 && !canContinueFromStepTwo) return
    if (step === 3 && !canSubmit) return

    if (step < 3) {
      goToStep(step + 1)
      return
    }

    submitVerification(event)
  }

  return (
    <section className="flex min-h-screen w-full items-start justify-center bg-[#f8f9fa] px-4 py-8 sm:px-6 md:px-10">
      <div className="w-full max-w-[1060px]">
        <FlowProgress step={step + 1} totalSteps={4} />

        <div className="mb-6">
          <div />
        </div>

        <section className="mb-6 overflow-hidden rounded-2xl border border-[#d8e2dc] bg-white shadow-sm">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#52796f]">
                Verification Flow
              </p>
              <h2 className="mt-3 text-2xl font-bold text-[#1b4332] sm:text-3xl">
                {activeHeroCopy.title}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[#52796f]">
                {activeHeroCopy.description}
              </p>
            </div>
            <div className="bg-[#eef4f0] p-4 sm:p-6">
              <img
                src={verificationHeroImage}
                alt="Verification illustration"
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </section>

        <form
          onSubmit={handleWizardSubmit}
          className="rounded-2xl border border-[#d8e2dc] bg-white p-6 shadow-sm sm:p-8"
        >
          {step === 1 && (
            <section className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-[#1b4332]">Set verification context</h2>
                <p className="mt-1 text-sm text-[#52796f]">
                  Define who is being verified and what sustainability claim the next proof upload must support.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <FormField label="Business Name">
                  <input
                    value={form.storeName}
                    onChange={(event) => onChange('storeName', event.target.value)}
                    className="w-full rounded-lg border border-[#d8e2dc] bg-white px-4 py-3 text-sm text-[#1b4332] outline-none transition-colors focus:border-[#1b4332]"
                  />
                </FormField>

                <CustomSelect
                  label="Country"
                  value={form.country}
                  options={countries}
                  onChange={(value) => onChange('country', value)}
                />

                <CustomSelect
                  label="E-commerce Platform"
                  value={form.platform}
                  options={platforms}
                  onChange={(value) => onChange('platform', value)}
                />

                <CustomSelect
                  label="Sustainability Category"
                  value={form.sustainabilityCategory}
                  options={categories}
                  onChange={(value) => onChange('sustainabilityCategory', value)}
                  placeholder="Select a category"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onBack}
                  aria-label="Go back"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d8e2dc] bg-white text-[#1b4332] transition-colors hover:bg-[#f4f7f5]"
                >
                  <IconArrowLeft size={20} />
                </button>
                <button
                  type="submit"
                  aria-label="Continue"
                  disabled={
                    !(
                      form.storeName.trim() !== '' &&
                      form.country.trim() !== '' &&
                      form.platform.trim() !== '' &&
                      form.sustainabilityCategory.trim() !== ''
                    )
                  }
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-white transition-colors ${
                    form.storeName.trim() !== '' &&
                    form.country.trim() !== '' &&
                    form.platform.trim() !== '' &&
                    form.sustainabilityCategory.trim() !== ''
                      ? 'bg-[#1b4332] hover:bg-[#163829]'
                      : 'cursor-not-allowed bg-[#b7c4b8]'
                  }`}
                >
                  <IconArrowRight size={20} />
                </button>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-[#1b4332]">Upload supporting proof</h2>
                <p className="mt-1 text-sm text-[#52796f]">
                  Add invoices, certifications, or shipping manifests that support the verification context you set in step 1.
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                  <label className="mb-3 block text-sm font-semibold text-[#1b4332]">
                    Proof documents
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
                    onDrop={(event) => {
                      handleFileDrop(event)
                      setIsAnalysing(true)
                    }}
                    className={`flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
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
                      setIsAnalysing(true)
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

                <aside className="rounded-xl border border-[#d8e2dc] bg-[#f8faf8] p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#52796f]">
                    OCR simulation
                  </p>
                  {form.files.length === 0 ? (
                    <p className="mt-4 text-sm text-[#52796f]">
                      Upload proof files to preview the extracted supplier, date, and material data.
                    </p>
                  ) : isAnalysing ? (
                    <div className="mt-5 space-y-4">
                      <div className="flex items-center gap-3 text-sm font-medium text-[#1b4332]">
                        <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-[#1b4332] border-t-transparent" />
                        <span>AI is analysing your document…</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[#d8e2dc]">
                        <div className="h-full w-2/3 rounded-full bg-[#1b4332]" />
                      </div>
                    </div>
                  ) : (
                    <div className="mt-5 space-y-3">
                      <div className="rounded-lg bg-white p-4 shadow-sm">
                        <p className="text-xs uppercase tracking-[0.18em] text-[#52796f]">
                          Supplier name
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#1b4332]">
                          {extractedData.supplierName}
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-4 shadow-sm">
                        <p className="text-xs uppercase tracking-[0.18em] text-[#52796f]">Date</p>
                        <p className="mt-1 text-sm font-semibold text-[#1b4332]">
                          {extractedData.documentDate}
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-4 shadow-sm">
                        <p className="text-xs uppercase tracking-[0.18em] text-[#52796f]">
                          Material type
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#1b4332]">
                          {extractedData.materialType}
                        </p>
                      </div>
                    </div>
                  )}
                </aside>
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => goToStep(1)}
                  aria-label="Go back"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d8e2dc] bg-white text-[#1b4332] transition-colors hover:bg-[#f4f7f5]"
                >
                  <IconArrowLeft size={20} />
                </button>
                <button
                  type="submit"
                  aria-label="Continue"
                  disabled={form.files.length === 0}
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-white transition-colors ${
                    form.files.length > 0
                      ? 'bg-[#1b4332] hover:bg-[#163829]'
                      : 'cursor-not-allowed bg-[#b7c4b8]'
                  }`}
                >
                  <IconArrowRight size={20} />
                </button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-[#1b4332]">Review & submit</h2>
                <p className="mt-1 text-sm text-[#52796f]">
                  Confirm the details below before sending the proof for verification.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1fr_0.95fr]">
                <article className="rounded-xl border border-[#d8e2dc] bg-[#f8faf8] p-5">
                  <h3 className="text-sm font-semibold text-[#1b4332]">Business summary</h3>
                  <div className="mt-4 space-y-3 text-sm text-[#315948]">
                    <div className="flex justify-between gap-4">
                      <span>Business name</span>
                      <span className="font-semibold text-[#1b4332]">{form.storeName}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Country</span>
                      <span className="font-semibold text-[#1b4332]">{form.country}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Platform</span>
                      <span className="font-semibold text-[#1b4332]">{form.platform}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Sustainability category</span>
                      <span className="font-semibold text-[#1b4332]">
                        {form.sustainabilityCategory || 'Not selected'}
                      </span>
                    </div>
                  </div>
                </article>

                <article className="rounded-xl border border-[#d8e2dc] bg-white p-5 shadow-sm">
                  <h3 className="text-sm font-semibold text-[#1b4332]">Uploaded proof</h3>
                  <div className="mt-4 space-y-3">
                    {form.files.length > 0 ? (
                      form.files.map((file) => (
                        <div
                          key={file.name}
                          className="rounded-lg bg-[#f4f7f5] px-4 py-3 text-sm text-[#315948]"
                        >
                          {file.name}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-[#52796f]">No files uploaded yet.</p>
                    )}
                  </div>

                  <div className="mt-5 rounded-lg bg-[#f4f7f5] p-4 text-sm text-[#315948]">
                    <p className="font-semibold text-[#1b4332]">Extracted data</p>
                    <p className="mt-2">Supplier: {extractedData.supplierName}</p>
                    <p>Date: {extractedData.documentDate}</p>
                    <p>Material: {extractedData.materialType}</p>
                  </div>
                </article>
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#d8e2dc] bg-[#f4f7f5] px-4 py-4 text-sm text-[#315948] transition-colors hover:border-[#b7c4b8] hover:bg-[#edf4ef]">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(event) => onChange('consent', event.target.checked)}
                  className="peer sr-only"
                />
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[#b7c4b8] bg-white text-transparent transition-all peer-checked:border-[#1b4332] peer-checked:bg-[#1b4332] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[#cfe0d4] peer-focus-visible:ring-offset-2">
                  <IconCheckMini />
                </span>
                <span className="leading-6">
                  I confirm this information is accurate and ready for verification review.
                </span>
              </label>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => goToStep(2)}
                  aria-label="Go back"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d8e2dc] bg-white text-[#1b4332] transition-colors hover:bg-[#f4f7f5]"
                >
                  <IconArrowLeft size={20} />
                </button>
                <button
                  type="submit"
                  disabled={!form.consent}
                  className={`rounded-lg px-8 py-3 text-sm font-medium text-white transition-colors ${
                    form.consent
                      ? 'bg-[#1b4332] hover:bg-[#163829]'
                      : 'cursor-not-allowed bg-[#b7c4b8]'
                  }`}
                >
                  Submit for Verification
                </button>
              </div>
            </section>
          )}
        </form>
      </div>
    </section>
  )
}

export default VerificationPage
