<!-- /apps/web/src/views/Orders.vue -->

<script setup lang="ts">
import { ref, computed } from 'vue'
import StockProgress from '../components/ui/StockProgress.vue' // Reuse from previous if relevant, or remove if not needed
import type { HardwareItem } from '../types/hardware'

// Extend for Order
interface OrderItem {
  product: HardwareItem
  quantity: number
  pricePerUnit: number
  subtotal: number
}

interface Order {
  id: string
  type: 'sale' | 'purchase' // As per user: type of order
  items: OrderItem[]
  total: number
  date: string | undefined
  notes?: string
}

// Dummy products (from inventory – in real app, fetch from API)
const availableProducts = ref<HardwareItem[]>([
  // Populate with dummy or fetch
  { id: '1', assetTag: 'LAP-001', brand: 'Dell', model: 'XPS 13', type: 'laptop', status: 'active', stockLevel: 7, maxStock: 10 } as any,
  { id: '2', assetTag: 'MON-001', brand: 'LG', model: 'UltraWide', type: 'monitor', status: 'active', stockLevel: 5, maxStock: 10 } as any,
  // Add more
])

// Dummy orders
const orders = ref<Order[]>([
  { id: '1', type: 'sale', items: [], total: 1500, date: '2026-01-26', notes: 'Daily sales' },
  // Add more
])

// Create mode
const isCreateMode = ref(false)
const newOrder = ref<Order>({
  id: '',
  type: 'sale',
  items: [],
  total: 0,
  date: new Date().toISOString().split('T')[0],
  notes: '',
})

// For adding items to new order
const selectedProductId = ref('')
const quantity = ref(1)
const pricePerUnit = ref(0) // Can auto-fill from product price if added to type

const addItemToOrder = () => {
  const product = availableProducts.value.find(p => p.id === selectedProductId.value)
  if (!product) return

  const subtotal = quantity.value * pricePerUnit.value
  newOrder.value.items.push({ product, quantity: quantity.value, pricePerUnit: pricePerUnit.value, subtotal })
  newOrder.value.total += subtotal

  // Reset form
  selectedProductId.value = ''
  quantity.value = 1
  pricePerUnit.value = 0
}

const removeItem = (index: number) => {
  const item = newOrder.value.items[index]
  if (!item) return

  newOrder.value.total -= item.subtotal
  newOrder.value.items.splice(index, 1)
}

const saveOrder = () => {
  newOrder.value.id = Date.now().toString()
  orders.value.push({ ...newOrder.value })
  isCreateMode.value = false
  // Reset
  newOrder.value = { id: '', type: 'sale', items: [], total: 0, date: new Date().toISOString().split('T')[0], notes: '' }
}

// Computed for totals etc. if needed
const sortedOrders = computed(() =>[...orders.value].sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0
    const dateB = b.date ? new Date(b.date).getTime() : 0
    return dateB - dateA
  })
)
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Orders & Sales</h1>
      <button @click="isCreateMode = true" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
        Create New Order/Sale
      </button>
    </div>

    <!-- List View -->
    <div v-if="!isCreateMode" class="bg-white shadow rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="order in sortedOrders" :key="order.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ order.date }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ order.type }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${{ order.total.toFixed(2) }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ order.items.length }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ order.notes || '—' }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="sortedOrders.length === 0" class="p-6 text-center text-gray-500">
        No orders yet. Create one to get started.
      </div>
    </div>

    <!-- Create Mode -->
    <div v-else class="bg-white shadow rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-6">Create New Order/Sale</h2>

      <div class="space-y-6">
        <!-- Order Details -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">Date</label>
            <input v-model="newOrder.date" type="date" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Type</label>
            <select v-model="newOrder.type" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="sale">Sale</option>
              <option value="purchase">Purchase</option>
            </select>
          </div>
        </div>

        <!-- Add Item -->
        <div class="border-t border-gray-200 pt-6">
          <h3 class="text-lg font-medium mb-4">Add Items</h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Product</label>
              <select v-model="selectedProductId" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">Select product</option>
                <option v-for="product in availableProducts" :key="product.id" :value="product.id">
                  {{ product.assetTag }} - {{ product.brand }} {{ product.model }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Quantity</label>
              <input v-model.number="quantity" type="number" min="1" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Price per Unit</label>
              <input v-model.number="pricePerUnit" type="number" step="0.01" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            </div>
            <div class="flex items-end">
              <button @click="addItemToOrder" :disabled="!selectedProductId" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50">
                Add Item
              </button>
            </div>
          </div>
        </div>

        <!-- Items Table -->
        <div v-if="newOrder.items.length > 0" class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price/Unit</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subtotal</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="(item, index) in newOrder.items" :key="index">
                <td class="px-6 py-4 text-sm">{{ item.product.brand }} {{ item.product.model }}</td>
                <td class="px-6 py-4 text-sm">{{ item.quantity }}</td>
                <td class="px-6 py-4 text-sm">${{ item.pricePerUnit.toFixed(2) }}</td>
                <td class="px-6 py-4 text-sm font-medium">${{ item.subtotal.toFixed(2) }}</td>
                <td class="px-6 py-4 text-sm">
                  <button @click="removeItem(index)" class="text-red-600 hover:text-red-900">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Total and Notes -->
        <div class="border-t border-gray-200 pt-6">
          <div class="flex justify-between text-lg font-medium">
            <span>Total</span>
            <span>${{ newOrder.total.toFixed(2) }}</span>
          </div>
          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700">Notes</label>
            <textarea v-model="newOrder.notes" rows="3" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-4 mt-8">
          <button @click="isCreateMode = false" class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
            Cancel
          </button>
          <button @click="saveOrder" :disabled="newOrder.items.length === 0" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50">
            Save Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>