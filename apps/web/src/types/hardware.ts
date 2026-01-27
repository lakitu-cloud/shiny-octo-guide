export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  registrationDate: string | undefined // ISO date
  totalOrders: number
  totalSpent: number        // in currency, e.g. TZS
  notes?: string
}

// Example order for history (expand as needed)
export interface CustomerOrder {
  id: string
  date: string
  total: number
  itemsCount: number
  status: 'completed' | 'pending' | 'cancelled'
}

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
  purchaseDate?: string
  warrantyEnd?: string
}

// Optional: add more shared types here later
export type HardwareStatus = HardwareItem['status']