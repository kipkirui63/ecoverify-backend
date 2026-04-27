import { useEffect, useRef, useState } from 'react'
import DashboardShell from './components/ui/DashboardShell'
import ConfirmationPage from './components/pages/ConfirmationPage'
import DashboardPage from './components/pages/DashboardPage'
import HistoryPage from './components/pages/HistoryPage'
import HomePage from './components/pages/HomePage'
import LoginPage from './components/pages/LoginPage'
import OnboardingPage from './components/pages/OnboardingPage'
import ProductsPage from './components/pages/ProductsPage'
import SettingsPage from './components/pages/SettingsPage'
import VerificationPage from './components/pages/VerificationPage'
import {
  categories,
  initialForm,
  platforms,
} from './data/mockData'
import type { Route, VerificationForm } from './types/app'

function getRouteFromHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, '')

  switch (hash) {
    case 'login':
    case 'onboarding':
    case 'verification':
    case 'confirmation':
    case 'dashboard':
    case 'products':
    case 'history':
    case 'settings':
      return hash
    default:
      return 'home'
  }
}

function goTo(route: Route) {
  const nextHash = route === 'home' ? '' : `#/${route}`
  if (window.location.hash === nextHash) return
  window.location.hash = nextHash
}

function App() {
  const [route, setRoute] = useState<Route>(() => getRouteFromHash())
  const [form, setForm] = useState<VerificationForm>(initialForm)
  const [copied, setCopied] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const syncRoute = () => setRoute(getRouteFromHash())
    window.addEventListener('hashchange', syncRoute)
    syncRoute()

    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  function navigate(nextRoute: Route) {
    goTo(nextRoute)
  }

  function updateField<K extends keyof VerificationForm>(key: K, value: VerificationForm[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function addFiles(fileList: FileList | null) {
    const nextFiles = Array.from(fileList ?? [])
      .filter((file) => file.size <= 10 * 1024 * 1024)
      .map((file) => ({ name: file.name, size: file.size, type: file.type }))

    if (nextFiles.length > 0) {
      updateField('files', [...form.files, ...nextFiles])
    }
  }

  function handleFileDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragging(false)
    addFiles(event.dataTransfer.files)
  }

  function removeFile(index: number) {
    updateField(
      'files',
      form.files.filter((_, currentIndex) => currentIndex !== index),
    )
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  async function copyEmbedCode() {
    const embedCode = `<div class="eco-verify-badge" data-product-id="hemp-hoodie-123">
  <img src="https://eco-verify.com/badges/verified.svg" alt="Eco-Verified: 100%">
</div>
<script src="https://eco-verify.com/widget.js"></script>`

    await navigator.clipboard.writeText(embedCode)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  function submitLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate('onboarding')
  }

  function submitOnboarding(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate('verification')
  }

  function submitVerification(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate('confirmation')
  }

  return (
    <main className="min-h-screen bg-[#f8f9fa] text-[#1b4332]">
      {route === 'home' && (
        <HomePage
          onLogin={() => navigate('login')}
          onOpenDashboard={() => navigate('dashboard')}
        />
      )}

      {route === 'login' && (
        <LoginPage
          onBackHome={() => navigate('home')}
          onSubmit={submitLogin}
        />
      )}

      {route === 'onboarding' && (
        <OnboardingPage
          form={form}
          onBack={() => navigate('login')}
          onSubmit={submitOnboarding}
          onChange={updateField}
          platforms={platforms}
        />
      )}

      {route === 'verification' && (
        <VerificationPage
          form={form}
          categories={categories}
          onBack={() => navigate('onboarding')}
          onViewDashboard={() => navigate('dashboard')}
          onChange={updateField}
          addFiles={addFiles}
          removeFile={removeFile}
          formatSize={formatSize}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
          handleFileDrop={handleFileDrop}
          fileInputRef={fileInputRef}
          submitVerification={submitVerification}
        />
      )}

      {route === 'confirmation' && (
        <ConfirmationPage
          copied={copied}
          copyEmbedCode={copyEmbedCode}
          productName={form.productName}
          category={form.sustainabilityCategory || '100% Organic'}
          onGoDashboard={() => navigate('dashboard')}
          onVerifyAnother={() => navigate('verification')}
        />
      )}

      {route === 'dashboard' && (
        <DashboardShell route="dashboard" onNavigate={navigate}>
          <DashboardPage onNewVerification={() => navigate('verification')} />
        </DashboardShell>
      )}

      {route === 'products' && (
        <DashboardShell route="products" onNavigate={navigate}>
          <ProductsPage onNewVerification={() => navigate('verification')} />
        </DashboardShell>
      )}

      {route === 'history' && (
        <DashboardShell route="history" onNavigate={navigate}>
          <HistoryPage onNewVerification={() => navigate('verification')} />
        </DashboardShell>
      )}

      {route === 'settings' && (
        <DashboardShell route="settings" onNavigate={navigate}>
          <SettingsPage onNewVerification={() => navigate('verification')} />
        </DashboardShell>
      )}
    </main>
  )
}

export default App
