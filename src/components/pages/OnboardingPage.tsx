import type { VerificationForm } from '../../types/app'
import CustomSelect from '../ui/CustomSelect'
import FormField from '../ui/FormField'
import { IconShield } from '../ui/Icons'
import FlowProgress from '../ui/FlowProgress'

function OnboardingPage({
  form,
  onBack,
  onSubmit,
  onChange,
  platforms,
}: {
  form: VerificationForm
  onBack: () => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onChange: <K extends keyof VerificationForm>(key: K, value: VerificationForm[K]) => void
  platforms: string[]
}) {
  return (
    <section className="flex min-h-screen w-full items-start justify-center bg-[#f8f9fa] px-4 py-8 sm:px-6 md:px-10">
      <div className="w-full max-w-[1040px]">
        <FlowProgress step={2} totalSteps={4} />
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#52796f]">Merchant Onboarding &amp; Store Integration</p>
            <h1 className="text-2xl font-bold text-[#1b4332] sm:text-3xl">
              Connect your storefront
            </h1>
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
          onSubmit={onSubmit}
          className="rounded-xl border border-[#d8e2dc] bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="mb-8 rounded-xl bg-[#f4f7f5] p-4 text-sm text-[#315948]">
            Connect merchant identity, platform, and storefront metadata before the product proof workflow begins.
          </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField label="Store Name">
                <input
                  value={form.storeName}
                  onChange={(event) => onChange('storeName', event.target.value)}
                  className="w-full rounded-lg border border-[#d8e2dc] bg-white px-4 py-3 text-sm text-[#1b4332] outline-none transition-colors focus:border-[#1b4332]"
                />
              </FormField>

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

              <FormField label="Contact Name">
                <input
                  value={form.contactName}
                  onChange={(event) => onChange('contactName', event.target.value)}
                  className="w-full rounded-lg border border-[#d8e2dc] bg-white px-4 py-3 text-sm text-[#1b4332] outline-none transition-colors focus:border-[#1b4332]"
                />
              </FormField>
            </div>

            <div className="mt-8 rounded-xl border border-[#d8e2dc] bg-[#fafcfa] p-4">
              <div className="mb-3 flex items-center gap-2 text-[#1b4332]">
                <IconShield size={16} />
                <h3 className="text-sm font-semibold">Ethics & data handling</h3>
              </div>
              <ul className="space-y-2 text-sm text-[#52796f]">
                <li>Only essential merchant details are collected in this MVP.</li>
                <li>Supplier-sensitive proof is redacted before consumer display.</li>
                <li>Merchants retain control over badge publication and refresh timing.</li>
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={onBack}
                className="rounded-lg border border-[#d8e2dc] bg-white px-5 py-3 text-sm font-medium text-[#1b4332] transition-colors hover:bg-[#f4f7f5]"
              >
                Back to Login
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[#1b4332] px-8 py-4 text-base font-medium text-white shadow-sm transition-colors hover:bg-[#163829]"
              >
                Continue to Verification
              </button>
            </div>
        </form>
      </div>
    </section>
  )
}

export default OnboardingPage
