import type { VerificationReport } from '../../types/app'
import FormField from '../ui/FormField'
import PageHeader from '../ui/PageHeader'

function SettingsPage({
  onNewVerification,
  report,
}: {
  onNewVerification: () => void
  report: VerificationReport
}) {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Update your store information, verification preferences, and consumer transparency controls."
        onNewVerification={onNewVerification}
      />

      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-xl border border-[#d8e2dc] bg-white p-5 shadow-sm sm:p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField label="Business Name">
              <input
                defaultValue="Verdant Thread"
                className="w-full rounded-lg border border-[#d8e2dc] bg-white px-4 py-3 text-sm text-[#1b4332] outline-none transition-colors focus:border-[#1b4332]"
              />
            </FormField>
            <FormField label="Notification Email">
              <input
                defaultValue="amina@verdantthread.co"
                className="w-full rounded-lg border border-[#d8e2dc] bg-white px-4 py-3 text-sm text-[#1b4332] outline-none transition-colors focus:border-[#1b4332]"
              />
            </FormField>
            <FormField label="Default Platform">
              <input
                defaultValue="Shopify"
                className="w-full rounded-lg border border-[#d8e2dc] bg-white px-4 py-3 text-sm text-[#1b4332] outline-none transition-colors focus:border-[#1b4332]"
              />
            </FormField>
            <FormField label="Badge Refresh">
              <input
                defaultValue={
                  report.badgeTier === 'Gold'
                    ? 'Every 90 days'
                    : report.badgeTier === 'Silver'
                      ? 'Every 365 days'
                      : 'Every 30 days'
                }
                className="w-full rounded-lg border border-[#d8e2dc] bg-white px-4 py-3 text-sm text-[#1b4332] outline-none transition-colors focus:border-[#1b4332]"
              />
            </FormField>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              className="rounded-lg bg-[#1b4332] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#163829]"
            >
              Save Changes
            </button>
          </div>
        </section>

        <section className="rounded-xl border border-[#d8e2dc] bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 text-lg font-bold text-[#1b4332]">Transparency controls</h2>
          <div className="space-y-4 text-sm text-[#52796f]">
            <article className="rounded-lg bg-[#f4f7f5] p-4">
              <h3 className="font-semibold text-[#1b4332]">Data minimisation</h3>
              <p className="mt-1">Only claim-relevant proof should be uploaded. Non-essential merchant data stays outside the consumer-facing modal.</p>
            </article>
            <article className="rounded-lg bg-[#f4f7f5] p-4">
              <h3 className="font-semibold text-[#1b4332]">Consumer visibility</h3>
              <p className="mt-1">Evidence is redacted before badge display to balance trust, compliance, and merchant confidentiality.</p>
            </article>
            <article className="rounded-lg bg-[#f4f7f5] p-4">
              <h3 className="font-semibold text-[#1b4332]">Badge maintenance</h3>
              <p className="mt-1">Next badge refresh is due on {report.nextRefreshDue}. Late refreshes reduce freshness confidence shown to consumers.</p>
            </article>
          </div>
        </section>
      </section>
    </>
  )
}

export default SettingsPage
