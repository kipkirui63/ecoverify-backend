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
import VerificationProgressPage from './components/pages/VerificationProgressPage'
import VerificationPage from './components/pages/VerificationPage'
import {
  countries,
  categories,
  defaultReport,
  historyEvents as initialHistoryEvents,
  initialForm,
  platforms,
  products as initialProducts,
} from './data/mockData'
import type {
  AuditEvent,
  ProductRecord,
  Route,
  UploadedFile,
  VerificationForm,
  VerificationReport,
  VerificationStatus,
} from './types/app'

function getRouteFromHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, '')

  switch (hash) {
    case 'login':
    case 'onboarding':
    case 'verification':
    case 'confirmation':
    case 'badge':
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

function formatPrettyDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function buildEvidence(files: UploadedFile[]) {
  if (files.length === 0) return defaultReport.evidence

  return files.map((file, index) => ({
    id: `${index}-${file.name}`,
    label: file.type.includes('pdf') ? 'Supplier document' : 'Material photo set',
    source: file.type.includes('pdf') ? 'OCR invoice parse' : 'Computer vision audit',
    redactedPreview: `${file.name.replace(/[A-Za-z0-9]/g, '*')} | Parsed fields: supplier, batch, destination`,
    verified: true,
  }))
}

function buildOcrSummary(files: UploadedFile[], category: string) {
  const base = [
    `OCR extracted document fields from ${files.length || 1} uploaded proof item(s).`,
    `Computer vision compared image metadata against the ${category || 'selected'} sustainability claim.`,
  ]

  if (files.some((file) => file.name.toLowerCase().includes('manifest'))) {
    base.push('Shipping manifest route and batch reference matched the merchant record.')
  } else {
    base.push('Registry cross-check could not confirm every shipment reference automatically.')
  }

  return base
}

function inferStatus(files: UploadedFile[], category: string): VerificationStatus {
  const names = files.map((file) => file.name.toLowerCase())
  const suspicious = names.some((name) =>
    ['draft', 'sample', 'blur', 'edited', 'mock'].some((keyword) => name.includes(keyword)),
  )

  if (suspicious) return 'Flagged'
  if (files.length < 2 || !category) return 'In Review'
  return 'Verified'
}

function buildReport(form: VerificationForm): VerificationReport {
  const now = new Date()
  const status = inferStatus(form.files, form.sustainabilityCategory)
  const category = form.sustainabilityCategory || 'Organic & Natural'
  const evidence = buildEvidence(form.files)
  const ocrSummary = buildOcrSummary(form.files, category)

  const badgeTier =
    status === 'Verified'
      ? form.files.length >= 3
        ? 'Gold'
        : 'Silver'
      : status === 'In Review'
        ? form.files.length > 0
          ? 'Silver'
          : 'Bronze'
        : 'Bronze'

  const anomalies =
    status === 'Flagged'
      ? [
          'One or more uploaded files appear edited or incomplete.',
          'Supplier reference mismatch requires manual human review before publication.',
        ]
      : status === 'In Review'
        ? [
            'Additional supporting evidence is required to complete automated verification.',
          ]
        : []

  const verifiedAt = formatPrettyDate(now)
  const nextRefresh = new Date(now)
  nextRefresh.setDate(nextRefresh.getDate() + (badgeTier === 'Gold' ? 90 : badgeTier === 'Silver' ? 365 : 30))

  const auditTrail: AuditEvent[] = [
    {
      id: '1',
      title: 'Merchant submission received',
      detail: `${form.storeName} in ${form.country} uploaded ${form.files.length || 1} evidence item(s) for ${form.productName}.`,
      when: formatDateTime(now),
    },
    {
      id: '2',
      title: 'OCR and computer vision pass completed',
      detail: 'Structured data fields were extracted and checked against the selected claim category.',
      when: formatDateTime(new Date(now.getTime() + 60_000)),
    },
    {
      id: '3',
      title: status === 'Verified' ? 'Dynamic badge issued' : 'Manual review queued',
      detail:
        status === 'Verified'
          ? `${badgeTier} badge generated and storefront widget marked ready for deployment.`
          : 'Evidence has been held for human validation before the badge can go live.',
      when: formatDateTime(new Date(now.getTime() + 180_000)),
    },
  ]

  return {
    productName: form.productName,
    category,
    status,
    badgeTier,
    badgeMessage:
      status === 'Verified'
        ? badgeTier === 'Gold'
          ? '100% Organic.'
          : 'Eco-Verified.'
        : status === 'In Review'
          ? badgeTier === 'Silver'
            ? 'Evidence received. The badge is being prepared for review.'
            : 'Proof is incomplete. Upload more evidence to raise the badge tier.'
          : 'Verification blocked pending manual anomaly review.',
    freshnessLabel:
      status === 'Verified'
        ? badgeTier === 'Gold'
          ? 'Fresh verification: valid for 90 days'
          : 'Verified archive state: valid for 1 year'
        : badgeTier === 'Silver'
          ? 'Review state: publication pending'
          : 'Freshness not published while review is open',
    verifiedAt,
    nextRefreshDue: formatPrettyDate(nextRefresh),
    confidenceScore:
      status === 'Verified' ? '99.1%' : status === 'In Review' ? '92.4%' : '71.6%',
    conversionLift:
      status === 'Verified' ? '+15%' : status === 'In Review' ? '+6% projected' : '+2% projected',
    integrityRate: status === 'Flagged' ? 'Needs review' : '99%',
    auditHash: `0xEV-${form.platform.slice(0, 3).toUpperCase()}-${verifiedAt.replace(/[^0-9]/g, '').slice(0, 8)}-${form.productName.slice(0, 4).toUpperCase()}`,
    widgetStatus: status === 'Verified' ? 'Connected' : status === 'In Review' ? 'Pending' : 'Action Needed',
    storeSyncStatus: form.platform === 'Custom Storefront' ? 'Pending' : 'Connected',
    ocrSummary,
    anomalies,
    evidence,
    auditTrail,
  }
}

function App() {
  const [route, setRoute] = useState<Route>(() => getRouteFromHash())
  const [form, setForm] = useState<VerificationForm>(initialForm)
  const [copied, setCopied] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [report, setReport] = useState<VerificationReport>(defaultReport)
  const [productRows, setProductRows] = useState<ProductRecord[]>(initialProducts)
  const [activity, setActivity] = useState(initialHistoryEvents)
  const [dashboardUnlocked, setDashboardUnlocked] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const syncRoute = () => setRoute(getRouteFromHash())
    window.addEventListener('hashchange', syncRoute)
    syncRoute()

    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  useEffect(() => {
    if (route !== 'badge') return

    const timeout = window.setTimeout(() => navigate('confirmation'), 1800)
    return () => window.clearTimeout(timeout)
  }, [route])

  function navigate(nextRoute: Route) {
    if (nextRoute === 'dashboard') {
      setDashboardUnlocked(true)
    }
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
    const badgeColor =
      report.badgeTier === 'Gold' ? 'gold' : report.badgeTier === 'Silver' ? 'silver' : 'bronze'

    const embedCode = `<div class="eco-verify-badge" data-product-id="${form.productName.toLowerCase().replace(/\s+/g, '-')}">
  <img src="https://eco-verify.com/badges/${badgeColor}.svg" alt="Eco-Verified: ${report.badgeTier}">
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

    const nextReport = buildReport(form)
    setReport(nextReport)

    setProductRows((current) => [
      {
        name: nextReport.productName,
        category: nextReport.category,
        status: nextReport.status,
        date: nextReport.verifiedAt,
        badgeTier: nextReport.badgeTier,
      },
      ...current.filter((item) => item.name !== nextReport.productName),
    ])

    setActivity((current) => [
      {
        title:
          nextReport.status === 'Verified'
            ? `${nextReport.productName} ${nextReport.badgeTier} badge issued`
            : nextReport.status === 'In Review'
              ? `${nextReport.productName} queued for review`
              : `${nextReport.productName} flagged for manual audit`,
        detail:
          nextReport.status === 'Verified'
            ? nextReport.badgeMessage
            : nextReport.anomalies[0] ?? 'Merchant evidence requires additional review.',
        when: 'Just now',
      },
      ...current,
    ])

    navigate('badge')
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
        dashboardUnlocked ? (
        <DashboardShell route="verification" onNavigate={navigate}>
          <VerificationPage
            form={form}
            categories={categories}
            countries={countries}
            platforms={platforms}
            onBack={() => navigate('dashboard')}
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
        </DashboardShell>
        ) : (
        <VerificationPage
          form={form}
          categories={categories}
          countries={countries}
          platforms={platforms}
          onBack={() => navigate('onboarding')}
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
        )
      )}

      {route === 'confirmation' && (
        dashboardUnlocked ? (
        <DashboardShell route="confirmation" onNavigate={navigate}>
          <ConfirmationPage
            actionLabel="Continue to Dashboard"
            copied={copied}
            copyEmbedCode={copyEmbedCode}
            hasBadge={true}
            merchantName={form.storeName}
            report={report}
            onGoDashboard={() => navigate('dashboard')}
          />
        </DashboardShell>
        ) : (
        <ConfirmationPage
          actionLabel="Continue to Dashboard"
          copied={copied}
          copyEmbedCode={copyEmbedCode}
          hasBadge={true}
          merchantName={form.storeName}
          report={report}
          onGoDashboard={() => navigate('dashboard')}
        />
        )
      )}

      {route === 'badge' && (
        <VerificationProgressPage />
      )}

      {route === 'dashboard' && (
        <DashboardShell route="dashboard" onNavigate={navigate}>
          <DashboardPage
            merchantName={form.storeName}
            report={report}
            totalClaimsSubmitted={productRows.length}
            queue={productRows}
            activity={activity}
            onStartVerification={() => navigate('verification')}
          />
        </DashboardShell>
      )}

      {route === 'products' && (
        <DashboardShell route="products" onNavigate={navigate}>
          <ProductsPage onNewVerification={() => navigate('verification')} rows={productRows} />
        </DashboardShell>
      )}

      {route === 'history' && (
        <DashboardShell route="history" onNavigate={navigate}>
          <HistoryPage
            onNewVerification={() => navigate('verification')}
            events={activity}
            report={report}
          />
        </DashboardShell>
      )}

      {route === 'settings' && (
        <DashboardShell route="settings" onNavigate={navigate}>
          <SettingsPage onNewVerification={() => navigate('verification')} report={report} />
        </DashboardShell>
      )}
    </main>
  )
}

export default App
