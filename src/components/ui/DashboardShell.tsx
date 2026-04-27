import type { ReactNode } from 'react'
import type { Route } from '../../types/app'
import {
  IconBox,
  IconHistory,
  IconLayoutDashboard,
  IconLeaf,
  IconPlus,
  IconSettings,
} from './Icons'

const dashboardNavItems: Array<{
  route: Extract<Route, 'dashboard' | 'products' | 'history' | 'settings'>
  label: string
  icon: ReactNode
}> = [
  { route: 'dashboard', label: 'Dashboard', icon: <IconLayoutDashboard size={18} /> },
  { route: 'products', label: 'Products', icon: <IconBox size={18} /> },
  { route: 'history', label: 'History', icon: <IconHistory size={18} /> },
  { route: 'settings', label: 'Settings', icon: <IconSettings size={18} /> },
]

function DashboardShell({
  route,
  onNavigate,
  children,
}: {
  route: Extract<Route, 'dashboard' | 'products' | 'history' | 'settings'>
  onNavigate: (route: Route) => void
  children: ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <aside className="hidden border-r border-[#d8e2dc] bg-white md:flex md:w-[240px] lg:w-[260px] lg:flex-col">
        <div className="flex items-center gap-2.5 px-6 py-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1b4332] text-white">
            <IconLeaf size={16} />
          </div>
          <span className="text-lg font-bold text-[#1b4332]">Eco-Verify</span>
        </div>

        <nav className="mt-2 flex-1 px-3">
          {dashboardNavItems.map((item) => {
            const isActive = route === item.route

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onNavigate(item.route)}
                className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#1b4332] text-white'
                    : 'text-[#52796f] hover:bg-[#f0f5f2] hover:text-[#1b4332]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-[#d8e2dc] bg-white px-4 py-4 md:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1b4332] text-white">
              <IconLeaf size={14} />
            </div>
            <span className="text-base font-bold text-[#1b4332]">Eco-Verify</span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('verification')}
            className="inline-flex items-center gap-1 rounded-lg bg-[#1b4332] px-4 py-2 text-sm font-medium text-white"
          >
            <IconPlus size={16} />
            <span>New</span>
          </button>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

export default DashboardShell
