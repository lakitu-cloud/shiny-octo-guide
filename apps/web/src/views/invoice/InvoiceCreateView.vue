<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { dummyProducts, dummyCustomers, createDummyInvoice, dummyInvoices } from '../../data/dummyData'
import type { InvoiceItem } from '../../../../../packages/shared/types'

const router = useRouter()

const form = ref({
  customerId: '',
  date: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  items: [] as InvoiceItem[],
})

const newItem = ref<Partial<InvoiceItem>>({
  productId: '',
  quantity: 1,
  discount: 0,
})

function addItem() {
  if (newItem.value.productId && newItem.value.quantity && newItem.value.quantity > 0) {
    form.value.items.push({ ...newItem.value } as InvoiceItem)
    newItem.value = { productId: '', quantity: 1, discount: 0 }
  }
}

function removeItem(index: number) {
  form.value.items.splice(index, 1)
}

const subtotal = computed(() => {
  return form.value.items.reduce((sum, item) => {
    const p = dummyProducts.find(prod => prod.id === item.productId)
    if (!p) return sum
    const discounted = p.price * (1 - item.discount / 100)
    return sum + discounted * item.quantity
  }, 0)
})

const tax = computed(() => Math.round(subtotal.value * 0.18 * 100) / 100)
const total = computed(() => subtotal.value + tax.value)

async function saveInvoice() {
  if (!form.value.customerId || form.value.items.length === 0) {
    alert('Please select a customer and add at least one item')
    return
  }

  const newInv = createDummyInvoice({
    customerId: form.value.customerId,
    items: form.value.items,
  })

  dummyInvoices.push(newInv)
  router.push({ name: 'Invoice.List' })
}
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-5xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <router-link to="/invoices" class="text-blue-600 hover:underline flex items-center gap-1">
          ← Back to Invoices
        </router-link>
        <div class="space-x-3">
          <button @click="router.push('/invoices')" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button
            @click="saveInvoice"
            class="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Invoice
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left column - Customer & Dates -->
        <div class="lg:col-span-1 space-y-6">
          <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 class="text-lg font-semibold mb-4">Invoice Details</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                <input v-model="form.date" type="date" class="w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input v-model="form.dueDate" type="date" class="w-full border-gray-300 rounded-md shadow-sm" />
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 class="text-lg font-semibold mb-4">Bill To</h2>
            <select v-model="form.customerId" class="w-full border-gray-300 rounded-md shadow-sm py-2">
              <option value="">Select Customer</option>
              <option v-for="c in dummyCustomers" :key="c.id" :value="c.id">
                {{ c.name }} — {{ c.email }}
              </option>
            </select>
            <div v-if="form.customerId" class="mt-4 text-sm text-gray-600">
              <p>{{ dummyCustomers.find(c => c.id === form.customerId)?.address }}</p>
            </div>
          </div>
        </div>

        <!-- Right column - Items + Summary -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 class="text-lg font-semibold mb-4">Items</h2>

            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead>
                  <tr class="border-b">
                    <th class="text-left py-3 px-2 font-medium">Product</th>
                    <th class="text-left py-3 px-2 font-medium">Qty</th>
                    <th class="text-left py-3 px-2 font-medium">Unit Price</th>
                    <th class="text-left py-3 px-2 font-medium">Disc. %</th>
                    <th class="text-left py-3 px-2 font-medium">Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, idx) in form.items" :key="idx" class="border-b hover:bg-gray-50">
                    <td class="py-3 px-2">
                      {{ dummyProducts.find(p => p.id === item.productId)?.name }}
                    </td>
                    <td class="py-3 px-2">{{ item.quantity }}</td>
                    <td class="py-3 px-2">
                      TZS {{ dummyProducts.find(p => p.id === item.productId)?.price.toLocaleString() }}
                    </td>
                    <td class="py-3 px-2">{{ item.discount }}%</td>
                    <td class="py-3 px-2 font-medium">
                      TZS {{
                        (
                          (dummyProducts.find(p => p.id === item.productId)?.price || 0) *
                          item.quantity *
                          (1 - item.discount / 100)
                        ).toLocaleString()
                      }}
                    </td>
                    <td class="py-3 px-2">
                      <button @click="removeItem(idx)" class="text-red-600 hover:text-red-800 text-sm">Remove</button>
                    </td>
                  </tr>

                  <!-- Add new row -->
                  <tr class="border-t bg-gray-50">
                    <td class="py-3 px-2">
                      <select v-model="newItem.productId" class="w-full border-gray-200 rounded">
                        <option value="">Select product...</option>
                        <option v-for="p in dummyProducts" :key="p.id" :value="p.id">
                          {{ p.name }} (TZS {{ p.price.toLocaleString() }})
                        </option>
                      </select>
                    </td>
                    <td class="py-3 px-2">
                      <input v-model.number="newItem.quantity" type="number" min="1" class="w-20 border-gray-200 rounded" />
                    </td>
                    <td class="py-3 px-2">-</td>
                    <td class="py-3 px-2">
                      <input v-model.number="newItem.discount" type="number" min="0" max="100" class="w-20 border-gray-200 rounded" />
                    </td>
                    <td class="py-3 px-2">-</td>
                    <td class="py-3 px-2">
                      <button @click="addItem" class="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                        Add
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Summary -->
          <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 class="text-lg font-semibold mb-4">Summary</h2>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span>TZS {{ subtotal.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">VAT (18%)</span>
                <span>TZS {{ tax.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Shipping</span>
                <span>TZS 0</span>
              </div>
              <div class="flex justify-between pt-3 border-t font-bold text-base">
                <span>Total</span>
                <span>TZS {{ total.toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>