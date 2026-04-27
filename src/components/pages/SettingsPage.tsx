import FormField from '../ui/FormField'
import PageHeader from '../ui/PageHeader'

function SettingsPage({ onNewVerification }: { onNewVerification: () => void }) {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Update your store information and verification preferences."
        onNewVerification={onNewVerification}
      />

      <section className="rounded-xl border border-[#d8e2dc] bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField label="Store Name">
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
              defaultValue="Automatic"
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
    </>
  )
}

export default SettingsPage
