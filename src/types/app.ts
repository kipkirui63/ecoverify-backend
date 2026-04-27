export type Route =
  | 'home'
  | 'login'
  | 'onboarding'
  | 'verification'
  | 'confirmation'
  | 'badge'
  | 'dashboard'
  | 'products'
  | 'history'
  | 'settings'

export type UploadedFile = { name: string; size: number; type: string }

export type VerificationForm = {
  storeName: string
  country: string
  platform: string
  website: string
  contactName: string
  productName: string
  sustainabilityCategory: string
  files: UploadedFile[]
  consent: boolean
}

export type VerificationStatus = 'Verified' | 'In Review' | 'Flagged'
export type BadgeTier = 'Gold' | 'Silver' | 'Bronze'
export type SyncStatus = 'Connected' | 'Pending' | 'Action Needed'

export type VerificationEvidence = {
  id: string
  label: string
  source: string
  redactedPreview: string
  verified: boolean
}

export type AuditEvent = {
  id: string
  title: string
  detail: string
  when: string
}

export type VerificationReport = {
  productName: string
  category: string
  status: VerificationStatus
  badgeTier: BadgeTier
  badgeMessage: string
  freshnessLabel: string
  verifiedAt: string
  nextRefreshDue: string
  confidenceScore: string
  conversionLift: string
  integrityRate: string
  auditHash: string
  widgetStatus: SyncStatus
  storeSyncStatus: SyncStatus
  ocrSummary: string[]
  anomalies: string[]
  evidence: VerificationEvidence[]
  auditTrail: AuditEvent[]
}

export type ProductRecord = {
  name: string
  category: string
  status: VerificationStatus
  date: string
  badgeTier?: BadgeTier
}
