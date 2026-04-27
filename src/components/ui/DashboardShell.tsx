import type { ReactNode } from 'react'
import type { Route } from '../../types/app'
import {
  IconBox,
  IconCheckCircle,
  IconHistory,
  IconLayoutDashboard,
  IconLeaf,
  IconPlus,
  IconSettings,
} from './Icons'

const dashboardNavItems: Array<{
  route: Extract<Route, 'dashboard' | 'products' | 'history' | 'settings' | 'confirmation'>
  label: string
  eyebrow: string
  icon: ReactNode
}> = [
  { route: 'dashboard', label: 'Dashboard', eyebrow: 'Overview', icon: <IconLayoutDashboard size={18} /> },
  { route: 'products', label: 'Products', eyebrow: 'Portfolio', icon: <IconBox size={18} /> },
  { route: 'history', label: 'History', eyebrow: 'Activity', icon: <IconHistory size={18} /> },
  { route: 'confirmation', label: 'Badge', eyebrow: 'Publish', icon: <IconCheckCircle size={18} /> },
  { route: 'settings', label: 'Settings', eyebrow: 'Control', icon: <IconSettings size={18} /> },
]

function DashboardShell({
  route,
  onNavigate,
  children,
}: {
  route: Extract<
    Route,
    'dashboard' | 'verification' | 'badge' | 'confirmation' | 'settings' | 'products' | 'history'
  >
  onNavigate: (route: Route) => void
  children: ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[linear-gradient(180deg,#f6faf7_0%,#eef4f0_100%)]">
      <aside className="hidden border-r border-[#d8e2dc] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,250,248,0.96))] md:flex md:w-[260px] md:flex-col">
        <div className="border-b border-[#e5eee8] px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1b4332] text-white shadow-sm">
              <IconLeaf size={22} />
            </div>
            <div>
              <span className="block text-[18px] font-semibold tracking-[-0.03em] text-[#1b4332]">
                Eco<span className="text-[#52796f]">Verify</span>
              </span>
              <span className="block text-[11.5px] font-medium uppercase tracking-[0.12em] text-[#7a9e8e]">
                Verify. Badge. Sell.
              </span>
            </div>
          </div>
        </div>

        

        <nav className="mt-5 flex flex-1 flex-col px-3 pb-6">
          <p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a9e8e]">
            Workspace
          </p>
          {dashboardNavItems.map((item) => {
            const isActive = route === item.route

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onNavigate(item.route)}
                className={`mb-1.5 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors ${
                  isActive
                    ? 'bg-[#163829] text-white shadow-[0_14px_30px_rgba(22,56,41,0.14)]'
                    : 'text-[#52796f] hover:bg-white hover:text-[#1b4332]'
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
                    isActive ? 'bg-white/12' : 'bg-[#f2f6f3] text-[#1b4332]'
                  }`}
                >
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <span className="block text-sm font-semibold">{item.label}</span>
                  <span
                    className={`block text-xs ${
                      isActive ? 'text-[#b9d1c4]' : 'text-[#7a9e8e]'
                    }`}
                  >
                    {item.eyebrow}
                  </span>
                </div>
              </button>
            )
          })}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-[#d8e2dc] bg-white/90 px-4 py-4 backdrop-blur md:justify-end">
          <div className="flex items-center gap-2 md:hidden">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1b4332] text-white shadow-sm">
              <IconLeaf size={22} />
            </div>
            <div>
              <span className="block text-[18px] font-semibold tracking-[-0.03em] text-[#1b4332]">
                Eco<span className="text-[#52796f]">Verify</span>
              </span>
              <span className="block text-[11.5px] font-medium uppercase tracking-[0.12em] text-[#7a9e8e]">
                Verify. Badge. Sell.
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('verification')}
            className="inline-flex items-center gap-1 rounded-xl bg-[#1b4332] px-4 py-2 text-sm font-medium text-white shadow-sm"
          >
            <IconPlus size={16} />
            <span>New Verification</span>
          </button>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

export default DashboardShell
