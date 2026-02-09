import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface PosStats {
  sales: string
  transactions: number
  itemsSold: number
  products: number
}

export const usePosUIStore = defineStore('pos-ui', () => {
  // Mode control
  const isTransactionsMode = ref(false)

  // Shared data (mocked for now – replace with real API calls)
  const stats = ref<PosStats>({
    sales: 'UGX 497,252',
    transactions: 36,
    itemsSold: 327,
    products: 27,
  })

  const products = ref<any[]>([
    { id: 1, name: 'FLUCONAZOLE 150mg', price: 800, stock: 55, maxStock: 100 },
    { id: 2, name: 'FUROSEMIDE 40mg', price: 4500, stock: 33, maxStock: 80 },
    { id: 3, name: 'PARACETAMOL 500mg', price: 500, stock: 8, maxStock: 200 },
    // Add more mock items...
  ])

  // Cart items (very minimal for now)
  const cartItems = ref<any[]>([])

  // Actions
  function toggleMode() {
    isTransactionsMode.value = !isTransactionsMode.value
  }

  function addToCart(product: any) {
    const existing = cartItems.value.find(item => item.id === product.id)
    if (existing) {
      if (existing.quantity < existing.stock) {
        existing.quantity += 1
      }
    } else {
      cartItems.value.push({
        ...product,
        quantity: 1,
      })
    }
  }

  const subtotal = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  return {
    isTransactionsMode,
    toggleMode,
    stats,
    products,
    cartItems,
    addToCart,
    subtotal,
  }
})