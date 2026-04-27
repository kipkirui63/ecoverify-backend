import type { ProductRecord, VerificationForm, VerificationReport } from '../types/app'

export const initialForm: VerificationForm = {
  storeName: '',
  country: 'Kenya',
  platform: 'Shopify',
  website: '',
  contactName: '',
  productName: 'Organic Hemp Hoodie',
  sustainabilityCategory: '',
  files: [],
  consent: true,
}

export const countries = ['Kenya', 'United States', 'United Kingdom', 'Canada', 'Germany']

export const platforms = ['Shopify', 'WooCommerce', 'Magento', 'Custom Storefront']

export const categories = [
  'Organic & Natural',
  'Recycled Materials',
  'Fair Trade',
  'Carbon Neutral',
  'Biodegradable',
  'Sustainably Sourced',
]

export const defaultReport: VerificationReport = {
  productName: 'Organic Hemp Hoodie',
  category: 'Organic & Natural',
  status: 'Verified',
  badgeTier: 'Gold',
  badgeMessage: '100% Organic.',
  freshnessLabel: 'Fresh verification: 14 days ago',
  verifiedAt: 'April 13, 2026',
  nextRefreshDue: 'July 12, 2026',
  confidenceScore: '99.1%',
  conversionLift: '+15%',
  integrityRate: '99%',
  auditHash: '0x5AE7-VERD-2026-0413-HEMP',
  widgetStatus: 'Connected',
  storeSyncStatus: 'Connected',
  ocrSummary: [
    'OCR extracted supplier name, invoice number, and hemp fiber weight.',
    'Computer vision matched shipment photos with invoice batch code.',
    'Registry cross-check found no claim conflict for the selected category.',
  ],
  anomalies: [],
  evidence: [
    {
      id: 'invoice',
      label: 'Supplier invoice',
      source: 'OCR invoice parse',
      redactedPreview: 'Invoice #VT-2048 | Supplier: [REDACTED] | Material: organic hemp fiber',
      verified: true,
    },
    {
      id: 'shipment',
      label: 'Shipping manifest',
      source: 'Manifest registry match',
      redactedPreview: 'Shipment route verified | Batch code: [REDACTED] | Destination: Kenya warehouse',
      verified: true,
    },
    {
      id: 'photo',
      label: 'Material photo set',
      source: 'Computer vision audit',
      redactedPreview: 'Photo metadata aligned with submitted batch timestamp and packaging marks.',
      verified: true,
    },
  ],
  auditTrail: [
    {
      id: '1',
      title: 'Document bundle received',
      detail: 'Merchant uploaded invoice, manifest, and material imagery.',
      when: 'April 13, 2026 · 09:10',
    },
    {
      id: '2',
      title: 'OCR and anomaly scan completed',
      detail: 'System extracted fields and checked for missing supplier data.',
      when: 'April 13, 2026 · 09:11',
    },
    {
      id: '3',
      title: 'Trust badge issued',
      detail: 'Gold badge generated and storefront widget marked connected.',
      when: 'April 13, 2026 · 09:15',
    },
  ],
}

export const stats = [
  { label: 'Total Verified', value: '12', icon: 'check' as const },
  { label: 'In Review', value: '3', icon: 'clock' as const },
  { label: 'Total Products', value: '15', icon: 'globe' as const },
]

export const products: ProductRecord[] = []

export const historyEvents: Array<{ title: string; detail: string; when: string }> = []
