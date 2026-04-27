export type Route =
  | 'home'
  | 'login'
  | 'onboarding'
  | 'verification'
  | 'confirmation'
  | 'dashboard'
  | 'products'
  | 'history'
  | 'settings'

export type UploadedFile = { name: string; size: number; type: string }

export type VerificationForm = {
  storeName: string
  platform: string
  website: string
  contactName: string
  productName: string
  sustainabilityCategory: string
  files: UploadedFile[]
  consent: boolean
}
