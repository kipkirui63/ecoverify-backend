import type { VerificationForm } from '../../types/app'
import CustomSelect from '../ui/CustomSelect'
import FormField from '../ui/FormField'
import { IconArrowLeft, IconArrowRight } from '../ui/Icons'
import FlowProgress from '../ui/FlowProgress'

function OnboardingPage({
  form,
  onBack,
  onSubmit,
  onChange,
  countries,
  platforms,
}: {
  form: VerificationForm
  onBack: () => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onChange: <K extends keyof VerificationForm>(key: K, value: VerificationForm[K]) => void
  countries: string[]
  platforms: string[]
}) {
  const canContinue =
    form.businessName.trim() !== '' &&
    form.contactName.trim() !== '' &&
    form.contactEmail.trim() !== '' &&
    form.contactPhone.trim() !== '' &&
    form.country.trim() !== '' &&
    form.platform.trim() !== '' &&
    form.website.trim() !== ''

  return (
    <section className="flex min-h-screen w-full items-start justify-center bg-[#f8f9fa] px-4 py-8 sm:px-6 md:px-10">
      <div className="w-full max-w-[1040px]">
        <FlowProgress step={1} totalSteps={4} />
        <div className="mb-8" />

        <div className="grid overflow-hidden rounded-xl border border-[#d8e2dc] bg-white shadow-sm lg:grid-cols-[1.05fr_0.95fr]">
          <form
            onSubmit={onSubmit}
            className="p-6 sm:p-8"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <FormField label="Business Name">
                <input
                  value={form.businessName}
                  onChange={(event) => onChange('businessName', event.target.value)}
                  className="w-full rounded-lg border border-[#d8e2dc] bg-white px-4 py-3 text-sm text-[#1b4332] outline-none transition-colors focus:border-[#1b4332]"
                />
              </FormField>

              <FormField label="Contact Name">
                <input
                  value={form.contactName}
                  onChange={(event) => onChange('contactName', event.target.value)}
                  className="w-full rounded-lg border border-[#d8e2dc] bg-white px-4 py-3 text-sm text-[#1b4332] outline-none transition-colors focus:border-[#1b4332]"
                />
              </FormField>

              <FormField label="Contact Email">
                <input
                  type="email"
                  value={form.contactEmail}
                  onChange={(event) => onChange('contactEmail', event.target.value)}
                  className="w-full rounded-lg border border-[#d8e2dc] bg-white px-4 py-3 text-sm text-[#1b4332] outline-none transition-colors focus:border-[#1b4332]"
                />
              </FormField>

              <FormField label="Contact Phone">
                <input
                  type="tel"
                  value={form.contactPhone}
                  onChange={(event) => onChange('contactPhone', event.target.value)}
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
                label="Platform"
                value={form.platform}
                options={platforms}
                onChange={(value) => onChange('platform', value)}
              />

              <FormField label="Website">
                <input
                  value={form.website}
                  onChange={(event) => onChange('website', event.target.value)}
                  className="w-full rounded-lg border border-[#d8e2dc] bg-white px-4 py-3 text-sm text-[#1b4332] outline-none transition-colors focus:border-[#1b4332]"
                />
              </FormField>
            </div>

            <div className="mt-6 rounded-xl border border-[#d8e2dc] bg-[#f8faf8] p-4">
              <p className="text-sm font-medium text-[#1b4332]">
                Your contact details stay private and are only used for verification review.
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between">
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
                disabled={!canContinue}
                className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-sm transition-colors ${
                  canContinue
                    ? 'bg-[#1b4332] hover:bg-[#163829]'
                    : 'cursor-not-allowed bg-[#b7c4b8]'
                }`}
              >
                <IconArrowRight size={20} />
              </button>
            </div>
          </form>

          <aside className="relative min-h-[320px] overflow-hidden bg-[#163829]">
            <img
              src="/image.png"
              alt="Sustainable fashion products ready for verification"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10271d]/85 via-[#163829]/30 to-transparent" />
            <div className="relative flex h-full flex-col items-center justify-end p-6 text-white sm:p-8">
              <div className="max-w-sm space-y-4 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#d6ebdf]">
                    Step 1
                  </p>
                  <h2 className="mt-2 text-2xl font-bold leading-tight">Personal Details</h2>
                  <p className="mt-3 text-sm leading-6 text-[#d6ebdf]">
                    Tell us who you are and how your store can be identified.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <article className="rounded-xl border border-white/10 bg-black/10 p-3">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#d6ebdf]">You add</p>
                    <p className="mt-2 text-sm font-medium text-white">Business name, contact details, platform, and website.</p>
                  </article>
                  <article className="rounded-xl border border-white/10 bg-black/10 p-3">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#d6ebdf]">Why</p>
                    <p className="mt-2 text-sm font-medium text-white">This helps us connect your store to the products you want to verify.</p>
                  </article>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-[#ecf8f0]">
                    Store name
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-[#ecf8f0]">
                    Contact details
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-[#ecf8f0]">
                    Store website
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default OnboardingPage
