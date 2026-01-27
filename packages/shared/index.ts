// packages/shared/index.ts

export interface HardwareItem {
  id: string
  assetTag: string
  type: 'laptop' | 'monitor' | 'server' | 'peripheral' | 'other'
  brand: string
  model: string
  serialNumber?: string
  status: 'active' | 'inactive' | 'repair' | 'disposed'
  location?: string
  assignedTo?: string
  purchaseDate?: string      // ISO date string
  warrantyEnd?: string       // ISO date string
}

// You can add more shared types here later
export type HardwareStatus = HardwareItem['status']