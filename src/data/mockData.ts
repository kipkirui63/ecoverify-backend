import type { VerificationForm } from '../types/app'

export const initialForm: VerificationForm = {
  storeName: 'Verdant Thread',
  platform: 'Shopify',
  website: 'verdantthread.co',
  contactName: 'Amina Otieno',
  productName: 'Organic Hemp Hoodie',
  sustainabilityCategory: '',
  files: [],
  consent: true,
}

export const platforms = ['Shopify', 'WooCommerce', 'Magento', 'Custom Storefront']

export const categories = [
  'Organic & Natural',
  'Recycled Materials',
  'Fair Trade',
  'Carbon Neutral',
  'Biodegradable',
  'Sustainably Sourced',
]

export const stats = [
  { label: 'Total Verified', value: '12', icon: 'check' as const },
  { label: 'In Review', value: '3', icon: 'clock' as const },
  { label: 'Total Products', value: '15', icon: 'globe' as const },
]

export const products = [
  {
    name: 'Organic Hemp Hoodie',
    category: 'Organic & Natural',
    status: 'Verified' as const,
    date: 'March 24, 2026',
  },
  {
    name: 'Recycled Cotton T-Shirt',
    category: 'Recycled Materials',
    status: 'In Review' as const,
    date: 'March 25, 2026',
  },
  {
    name: 'Bamboo Lounge Set',
    category: 'Sustainably Sourced',
    status: 'Verified' as const,
    date: 'April 2, 2026',
  },
]

export const historyEvents = [
  {
    title: 'Organic Hemp Hoodie approved',
    detail: 'Trust badge issued after invoice and farm certificate review.',
    when: 'Today',
  },
  {
    title: 'Recycled Cotton T-Shirt submitted',
    detail: 'Awaiting supporting shipment photos from supplier.',
    when: 'Yesterday',
  },
  {
    title: 'Store sync completed',
    detail: 'Shopify storefront connected and badge widget enabled.',
    when: 'April 23, 2026',
  },
]
