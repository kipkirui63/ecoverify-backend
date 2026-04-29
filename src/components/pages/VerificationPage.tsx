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
  IconEdit,
  IconFileText,
  IconImage,
  IconUpload,
  IconX,
} from '../ui/Icons'

function VerificationPage({
  form,
  categories,
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
  const [step, setStep] = useState(1)
  const [isAnalysing, setIsAnalysing] = useState(false)
  const heroCopyByStep = {
    1: {
      title: 'Product Details',
      description: 'Tell us which product you want to verify.',
      primaryLabel: 'You add',
      primaryValue: 'Product name, product link, product code, and category.',
      secondaryLabel: 'Why',
      secondaryValue: 'This helps us match the right proof to the right product.',
      chips: ['Product name', 'Product link', 'Category'],
    },
    2: {
      title: 'Proof Documents',
      description: 'Upload files that support the product information you provided.',
      primaryLabel: 'You add',
      primaryValue: 'Documents or images that show where the product information comes from.',
      secondaryLabel: 'Why',
      secondaryValue: 'This helps us check whether the claim can be supported.',
      chips: ['Invoices', 'Certificates', 'Photos'],
    },
    3: {
      title: 'Review',
      description: 'Give consent before sending your submission for verification.',
      primaryLabel: 'Consent',
      primaryValue: 'You confirm the details are correct before submission.',
      secondaryLabel: 'Ready to review',
      secondaryValue: 'Personal details, product details, and proof documents.',
      chips: ['Personal details', 'Product details', 'Proof documents'],
    },
  } as const
  const activeHeroCopy = heroCopyByStep[step as 1 | 2 | 3]
  const reviewPanelItems = [
    { label: 'Personal details', targetStep: 1 },
    { label: 'Product details', targetStep: 1 },
    { label: 'Proof documents', targetStep: 2 },
  ] as const

  useEffect(() => {
    if (step !== 2 || form.files.length === 0 || !isAnalysing) {
      return
    }

    const timeout = window.setTimeout(() => setIsAnalysing(false), 1200)
    return () => window.clearTimeout(timeout)
  }, [form.files.length, isAnalysing, step])

  const extractedData = useMemo(() => {
    const primaryFile = form.files[0]?.name ?? 'proof-document.pdf'
    const normalizedName = primaryFile.toLowerCase()
    const inferredDocumentType = normalizedName.includes('manifest')
      ? 'Shipping Manifest'
      : normalizedName.includes('cert')
        ? 'Certificate'
        : 'Invoice'
    const inferredOrigin = normalizedName.includes('kenya')
      ? 'Kenya'
      : normalizedName.includes('india')
        ? 'India'
        : normalizedName.includes('turkey')
          ? 'Turkey'
          : 'India'

    return {
      supplierName: `${form.businessName} supplier`,
      documentType: inferredDocumentType,
      documentNumber: 'INV-2048',
      issueDate: new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date()),
      batchCode: 'BT-1182',
      origin: inferredOrigin,
      claimReference: form.sustainabilityCategory || 'Organic & Natural',
      fileName: primaryFile,
    }
  }, [form.businessName, form.files, form.sustainabilityCategory])
  const showProofExtractionOnImage = step === 2 && form.files.length > 0 && !isAnalysing
  const stepIllustration = (
    <aside className="relative min-h-[320px] overflow-hidden bg-[#163829]">
      <img
        src="/image.png"
        alt="Verification illustration"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#10271d]/85 via-[#163829]/30 to-transparent" />
      <div className="relative flex h-full flex-col items-center justify-end p-6 text-white sm:p-8">
        {step === 3 ? (
          <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#d6ebdf]">
              Step 4
            </p>
            <h2 className="mt-2 text-2xl font-bold leading-tight">{activeHeroCopy.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[#d6ebdf]">
              {activeHeroCopy.description}
            </p>

            <div className="mt-5 space-y-3">
              {reviewPanelItems.map((item) => (
                <article
                  key={item.label}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/15 px-4 py-3"
                >
                  <span className="text-sm font-medium text-white">{item.label}</span>
                  <button
                    type="button"
                    onClick={() => goToStep(item.targetStep)}
                    aria-label={`Edit ${item.label}`}
                    className="rounded-full border border-white/15 bg-white/10 p-2 text-[#e8f5ec] transition-colors hover:bg-white/20"
                  >
                    <IconEdit size={14} />
                  </button>
                </article>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-white/10 bg-black/15 p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#d6ebdf]">Consent</p>
              <p className="mt-2 text-sm font-medium text-white">
                Confirm the details are correct before sending for verification.
              </p>
            </div>
          </div>
        ) : showProofExtractionOnImage ? (
          <div className="max-w-sm space-y-4 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#d6ebdf]">
                Extracted proof data
              </p>
              <h2 className="mt-2 text-2xl font-bold leading-tight">Proof Documents</h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <article className="rounded-xl border border-white/10 bg-black/10 p-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#d6ebdf]">Supplier</p>
                <p className="mt-2 text-sm font-medium text-white">{extractedData.supplierName}</p>
              </article>
              <article className="rounded-xl border border-white/10 bg-black/10 p-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#d6ebdf]">Document type</p>
                <p className="mt-2 text-sm font-medium text-white">{extractedData.documentType}</p>
              </article>
              <article className="rounded-xl border border-white/10 bg-black/10 p-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#d6ebdf]">Document number</p>
                <p className="mt-2 text-sm font-medium text-white">{extractedData.documentNumber}</p>
              </article>
              <article className="rounded-xl border border-white/10 bg-black/10 p-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#d6ebdf]">Issue date</p>
                <p className="mt-2 text-sm font-medium text-white">{extractedData.issueDate}</p>
              </article>
              <article className="rounded-xl border border-white/10 bg-black/10 p-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#d6ebdf]">Batch / Lot code</p>
                <p className="mt-2 text-sm font-medium text-white">{extractedData.batchCode}</p>
              </article>
              <article className="rounded-xl border border-white/10 bg-black/10 p-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#d6ebdf]">Origin</p>
                <p className="mt-2 text-sm font-medium text-white">{extractedData.origin}</p>
              </article>
            </div>

            <article className="rounded-xl border border-white/10 bg-black/10 p-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#d6ebdf]">Material / Claim reference</p>
              <p className="mt-2 text-sm font-medium text-white">{extractedData.claimReference}</p>
            </article>
          </div>
        ) : (
          <div className="max-w-sm space-y-4 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#d6ebdf]">
                Step {step + 1}
              </p>
              <h2 className="mt-2 text-2xl font-bold leading-tight">{activeHeroCopy.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#d6ebdf]">
                {activeHeroCopy.description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <article className="rounded-xl border border-white/10 bg-black/10 p-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#d6ebdf]">
                  {activeHeroCopy.primaryLabel}
                </p>
                <p className="mt-2 text-sm font-medium text-white">{activeHeroCopy.primaryValue}</p>
              </article>
              <article className="rounded-xl border border-white/10 bg-black/10 p-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#d6ebdf]">
                  {activeHeroCopy.secondaryLabel}
                </p>
                <p className="mt-2 text-sm font-medium text-white">{activeHeroCopy.secondaryValue}</p>
              </article>
            </div>

            <div className="flex flex-wrap gap-2">
              {activeHeroCopy.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-[#ecf8f0]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  )

  function goToStep(nextStep: number) {
    setStep(Math.min(3, Math.max(1, nextStep)))
  }

  function handleWizardSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const canContinueFromStepOne =
      form.productName.trim() !== '' &&
      form.productSku.trim() !== '' &&
      form.productUrl.trim() !== '' &&
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
      <div className="w-full max-w-[1040px]">
        <FlowProgress step={step + 1} totalSteps={4} />
        <div className="mb-8" />

        {step === 3 ? (
          <section className="relative overflow-hidden rounded-xl border border-[#d8e2dc] bg-[#163829] shadow-sm">
            <img
              src="/image.png"
              alt="Verification illustration"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10271d]/90 via-[#163829]/55 to-[#163829]/25" />
            <form onSubmit={handleWizardSubmit} className="relative p-6 text-white sm:p-8">
              <div className="mx-auto max-w-4xl space-y-6">
                <div className="max-w-xl">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#d6ebdf]">
                    Step 4
                  </p>
                  <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">Review</h1>
                  <p className="mt-3 text-sm leading-6 text-[#d6ebdf]">
                    Give consent before sending your submission for verification.
                  </p>
                </div>

                <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="space-y-4">
                    {reviewPanelItems.map((item) => (
                      <article
                        key={item.label}
                        className="flex items-center justify-between rounded-2xl border border-white/15 bg-black/20 px-4 py-4 backdrop-blur-sm"
                      >
                        <span className="text-sm font-medium text-white sm:text-base">{item.label}</span>
                        <button
                          type="button"
                          onClick={() => goToStep(item.targetStep)}
                          aria-label={`Edit ${item.label}`}
                          className="rounded-full border border-white/15 bg-white/10 p-2 text-[#e8f5ec] transition-colors hover:bg-white/20"
                        >
                          <IconEdit size={14} />
                        </button>
                      </article>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <article className="rounded-2xl border border-white/15 bg-black/20 p-5 backdrop-blur-sm">
                      <h3 className="text-sm font-semibold text-white">Submission summary</h3>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-[#d6ebdf]">Business Name</p>
                          <p className="mt-2 text-sm font-medium text-white">{form.businessName}</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-[#d6ebdf]">Product Name</p>
                          <p className="mt-2 text-sm font-medium text-white">{form.productName}</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-[#d6ebdf]">Category</p>
                          <p className="mt-2 text-sm font-medium text-white">{form.sustainabilityCategory}</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-[#d6ebdf]">Files</p>
                          <p className="mt-2 text-sm font-medium text-white">{form.files.length} uploaded</p>
                        </div>
                      </div>
                    </article>

                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/15 bg-black/20 px-4 py-4 text-sm text-[#ecf8f0] backdrop-blur-sm">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(event) => onChange('consent', event.target.checked)}
                        className="peer sr-only"
                      />
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-white/25 bg-white/10 text-transparent transition-all peer-checked:border-white peer-checked:bg-white peer-checked:text-[#163829] peer-focus-visible:ring-2 peer-focus-visible:ring-white/40 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-transparent">
                        <IconCheckMini />
                      </span>
                      <span className="leading-6">
                        Confirm the details are correct before sending for verification.
                      </span>
                    </label>

                    <div className="flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => goToStep(2)}
                        aria-label="Go back"
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
                      >
                        <IconArrowLeft size={20} />
                      </button>
                      <button
                        type="submit"
                        disabled={!form.consent}
                        className={`rounded-lg px-8 py-3 text-sm font-medium transition-colors ${
                          form.consent
                            ? 'bg-white text-[#163829] hover:bg-[#ecf8f0]'
                            : 'cursor-not-allowed bg-white/30 text-white/70'
                        }`}
                      >
                        Submit for Verification
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </section>
        ) : (
        <div className="grid overflow-hidden rounded-xl border border-[#d8e2dc] bg-white shadow-sm lg:grid-cols-[1.05fr_0.95fr]">
          <form onSubmit={handleWizardSubmit}>
          {step === 1 && (
            <section>
              <div className="space-y-6 p-6 sm:p-8">
                <div>
                  <h1 className="mt-3 text-2xl font-bold text-[#1b4332] sm:text-3xl">
                    {activeHeroCopy.title}
                  </h1>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField label="Product Name">
                    <input
                      value={form.productName}
                      onChange={(event) => onChange('productName', event.target.value)}
                      className="w-full rounded-lg border border-[#d8e2dc] bg-white px-4 py-3 text-sm text-[#1b4332] outline-none transition-colors focus:border-[#1b4332]"
                    />
                  </FormField>

                  <FormField label="Product SKU">
                    <input
                      value={form.productSku}
                      onChange={(event) => onChange('productSku', event.target.value)}
                      className="w-full rounded-lg border border-[#d8e2dc] bg-white px-4 py-3 text-sm text-[#1b4332] outline-none transition-colors focus:border-[#1b4332]"
                    />
                  </FormField>

                  <FormField label="Product URL">
                    <input
                      value={form.productUrl}
                      onChange={(event) => onChange('productUrl', event.target.value)}
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

                <section className="rounded-xl border border-[#d8e2dc] bg-[#f8faf8] p-5">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <article className="rounded-lg bg-white p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.18em] text-[#52796f]">Product SKU</p>
                      <p className="mt-2 text-sm font-medium text-[#1b4332]">The product code used to identify this item in your store.</p>
                    </article>
                    <article className="rounded-lg bg-white p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.18em] text-[#52796f]">Product URL</p>
                      <p className="mt-2 text-sm font-medium text-[#1b4332]">The web link to the product page on your store.</p>
                    </article>
                    <article className="rounded-lg bg-white p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.18em] text-[#52796f]">Sustainability Category</p>
                      <p className="mt-2 text-sm font-medium text-[#1b4332]">The type of sustainability claim you want this product checked against.</p>
                    </article>
                  </div>
                </section>

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
                        form.productName.trim() !== '' &&
                        form.productSku.trim() !== '' &&
                        form.productUrl.trim() !== '' &&
                        form.sustainabilityCategory.trim() !== ''
                      )
                    }
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-white transition-colors ${
                      form.productName.trim() !== '' &&
                      form.productSku.trim() !== '' &&
                      form.productUrl.trim() !== '' &&
                      form.sustainabilityCategory.trim() !== ''
                        ? 'bg-[#1b4332] hover:bg-[#163829]'
                        : 'cursor-not-allowed bg-[#b7c4b8]'
                    }`}
                  >
                    <IconArrowRight size={20} />
                  </button>
                </div>
              </div>
            </section>
          )}

          {step === 2 && (
            <section>
              <div className="space-y-6 p-6 sm:p-8">
                <div>
                  <h1 className="mt-3 text-2xl font-bold text-[#1b4332] sm:text-3xl">
                    {activeHeroCopy.title}
                  </h1>
                </div>

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

                

                <section className="rounded-xl border border-[#d8e2dc] bg-[#f8faf8] p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#52796f]">
                    Extracted proof data
                  </p>
                  {form.files.length === 0 ? (
                    <p className="mt-4 text-sm text-[#52796f]">
                      Upload proof files to preview the extracted document details.
                    </p>
                  ) : isAnalysing ? (
                    <div className="mt-5 space-y-4">
                      <div className="flex items-center gap-3 text-sm font-medium text-[#1b4332]">
                        <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-[#1b4332] border-t-transparent" />
                        <span>Analysing your document…</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[#d8e2dc]">
                        <div className="h-full w-2/3 rounded-full bg-[#1b4332]" />
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 flex items-center gap-3 rounded-lg bg-white p-4 text-sm font-medium text-[#1b4332] shadow-sm">
                      <span className="flex h-10 w-10 animate-pulse items-center justify-center rounded-full bg-[#e9f7ee] text-[#20613d] shadow-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-semibold text-[#1b4332]">Analysis complete</p>
                      </div>
                    </div>
                  )}
                </section>

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
              </div>
            </section>
          )}

          {step === 3 && (
            <section>
              <div className="space-y-6 p-6 sm:p-8">
                <div>
                  <h1 className="mt-3 text-2xl font-bold text-[#1b4332] sm:text-3xl">
                    {activeHeroCopy.title}
                  </h1>
                </div>

                <div className="grid gap-4">
                  <article className="rounded-xl border border-[#d8e2dc] bg-[#f8faf8] p-5">
                    <h3 className="text-sm font-semibold text-[#1b4332]">Personal Details</h3>
                    <div className="mt-4 space-y-3 text-sm text-[#315948]">
                      <div className="flex justify-between gap-4">
                        <span>Business Name</span>
                        <span className="font-semibold text-[#1b4332]">{form.businessName}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Contact Name</span>
                        <span className="font-semibold text-[#1b4332]">{form.contactName}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Contact Email</span>
                        <span className="font-semibold text-[#1b4332]">{form.contactEmail}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Contact Phone</span>
                        <span className="font-semibold text-[#1b4332]">{form.contactPhone}</span>
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
                        <span>Website</span>
                        <span className="font-semibold text-[#1b4332]">{form.website}</span>
                      </div>
                    </div>
                  </article>

                  <article className="rounded-xl border border-[#d8e2dc] bg-[#f8faf8] p-5">
                    <h3 className="text-sm font-semibold text-[#1b4332]">Product Details</h3>
                    <div className="mt-4 space-y-3 text-sm text-[#315948]">
                      <div className="flex justify-between gap-4">
                        <span>Product Name</span>
                        <span className="font-semibold text-[#1b4332]">{form.productName}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Product SKU</span>
                        <span className="font-semibold text-[#1b4332]">{form.productSku}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Product URL</span>
                        <span className="font-semibold text-[#1b4332]">{form.productUrl}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Sustainability Category</span>
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
                      <p>Document type: {extractedData.documentType}</p>
                      <p>Document number: {extractedData.documentNumber}</p>
                      <p>Issue date: {extractedData.issueDate}</p>
                      <p>Batch / Lot code: {extractedData.batchCode}</p>
                      <p>Origin: {extractedData.origin}</p>
                      <p>Material / Claim reference: {extractedData.claimReference}</p>
                    </div>
                  </article>

                  <article className="rounded-xl border border-[#d8e2dc] bg-[#f8faf8] p-5">
                    <h3 className="text-sm font-semibold text-[#1b4332]">Transparency</h3>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg bg-white p-4 shadow-sm">
                        <p className="text-xs uppercase tracking-[0.18em] text-[#52796f]">Shown to shoppers</p>
                        <p className="mt-2 text-sm text-[#315948]">
                          Badge tier, verification date, product category, redacted evidence summary.
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-4 shadow-sm">
                        <p className="text-xs uppercase tracking-[0.18em] text-[#52796f]">Kept private</p>
                        <p className="mt-2 text-sm text-[#315948]">
                          Contact details, raw supplier documents, and internal review notes.
                        </p>
                      </div>
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
                    I confirm the information is accurate and I understand public badge details may be shown with redacted evidence.
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
              </div>
            </section>
          )}

          </form>

          {stepIllustration}
        </div>
        )}
      </div>
    </section>
  )
}

export default VerificationPage
