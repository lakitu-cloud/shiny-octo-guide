import type { Product, Customer, Invoice, InvoiceItem, User, Sale } from '../../../../packages/shared/types'

export const dummyProducts: Product[] = [
  { id: 'p1', name: 'Dell Latitude 5540', price: 1450 },
  { id: 'p2', name: '27" 4K Monitor', price: 420 },
  { id: 'p3', name: 'Mechanical Keyboard', price: 89 },
  { id: 'p4', name: 'Wireless Mouse', price: 45 },
  { id: 'p5', name: '16GB DDR5 RAM', price: 120 },
]

export const dummyCustomers: Customer[] = [
  { id: 'c1', name: 'Amani Tech Ltd', address: 'Plot 45, Ali Hassan Mwinyi Rd, Dar es Salaam', email: 'info@amanitech.co.tz' },
  { id: 'c2', name: 'John K. Mwakalebela', address: 'Mikocheni B, Dar es Salaam', email: 'john.mwakalebela@gmail.com' },
  { id: 'c3', name: 'Zanzibar University', address: 'Tunguu, Zanzibar', email: 'procurement@zanuni.ac.tz' },
]

let invoiceCounter = 1008

// Make date, dueDate, status optional in the input
// We'll generate them if missing
type CreateInvoiceInput = {
  customerId: string
  items: InvoiceItem[]
  date?: string          // optional string
  dueDate?: string       // optional string
  status?: Invoice['status']
}

export function createDummyInvoice(input: CreateInvoiceInput): Invoice {
  const now = new Date()
  const due = new Date(now)
  due.setDate(due.getDate() + 14)

  const date       = input.date    ?? now.toISOString().split('T')[0] 
  const dueDate    = input.dueDate ?? due.toISOString().split('T')[0]
  const status     = input.status  ?? 'draft'

  const subtotal = input.items.reduce((sum, item) => {
    const product = dummyProducts.find(p => p.id === item.productId)
    if (!product) return sum
    const priceAfterDiscount = product.price * (1 - item.discount / 100)
    return sum + priceAfterDiscount * item.quantity
  }, 0)

  const tax      = Math.round(subtotal * 0.18 * 100) / 100   // 18% VAT (Tanzania example)
  const shipping = 0
  const total    = subtotal + tax + shipping

  return {
    id: `inv-${Date.now()}-${invoiceCounter}`, // make more unique
    number: `INV-${invoiceCounter++}`,
    date,
    dueDate,
    customerId: input.customerId,
    items: input.items,
    subtotal,
    tax,
    shipping,
    total,
    status,
  }
}

export let dummyInvoices: Invoice[] = [
  createDummyInvoice({
    customerId: 'c1',
    items: [
      { productId: 'p1', quantity: 2, discount: 5 },
      { productId: 'p3', quantity: 5, discount: 0 },
    ],
  }),
  createDummyInvoice({
    customerId: 'c2',
    items: [
      { productId: 'p2', quantity: 1, discount: 10 },
      { productId: 'p4', quantity: 3, discount: 0 },
    ],
  }),
]

export const dummyUsers: User[] = [
  { id: 'u1', name: 'Admin User', email: 'admin@example.com', password: 'hashedpass', role: 'admin', createdAt: '2024-01-01' },
  { id: 'u2', name: 'Sales Rep 1', email: 'sales1@example.com', password: 'hashedpass', role: 'sales', createdAt: '2024-02-15' },
  { id: 'u3', name: 'Sales Rep 2', email: 'sales2@example.com', password: 'hashedpass', role: 'sales', createdAt: '2024-03-20' },
];

export const dummySales: Sale[] = [
  { id: 's1', userId: 'u2', amount: 1500000, date: '2024-04-01' },
  { id: 's2', userId: 'u2', amount: 800000, date: '2024-04-05' },
  { id: 's3', userId: 'u3', amount: 2000000, date: '2024-04-10' },
  { id: 's4', userId: 'u3', amount: 1200000, date: '2024-04-15' },
];

let userCounter = dummyUsers.length + 1;

// Helper to create/update user
// ──────────────────────────────────────────────────────────────
//  Helper to create / update user – FIXED
// ──────────────────────────────────────────────────────────────
export function upsertUser(partial: Partial<User> & { name: string; email: string; role: 'admin' | 'sales' }): User {
  const now = new Date().toISOString().split('T')[0];

  if (partial.id) {
    // ─── UPDATE ────────────────────────────────────────────────
    const existing = dummyUsers.find(u => u.id === partial.id);
    if (!existing) {
      throw new Error(`User with id ${partial.id} not found`);
    }

    // We keep existing values where partial is undefined
    const updated: User = {
      ...existing,
      name: partial.name ?? existing.name,
      email: partial.email ?? existing.email,
      role: partial.role ?? existing.role,
      password: partial.password ?? existing.password, // allow password change
      // createdAt is never updated
    };

    const index = dummyUsers.indexOf(existing);
    dummyUsers[index] = updated;
    return updated;
  }

  // ─── CREATE ─────────────────────────────────────────────────
  const newUser: User = {
    id: `u${userCounter++}`,
    name: partial.name!,          // required by type constraint
    email: partial.email!,        // required
    role: partial.role!,          // required
    password: partial.password ?? 'hashedpass', // default if not provided
    createdAt: now as string,               // always generated
  };

  dummyUsers.push(newUser);
  return newUser;
}

// Helper to delete user
export function deleteUser(id: string): void {
  const index = dummyUsers.findIndex(u => u.id === id);
  if (index === -1) throw new Error('User not found');
  dummyUsers.splice(index, 1);
  // Optionally: remove associated sales, but skip for now
}

// Helper to get turnover
export function getUserTurnover(userId: string): number {
  return dummySales
    .filter(s => s.userId === userId)
    .reduce((sum, s) => sum + s.amount, 0);
}