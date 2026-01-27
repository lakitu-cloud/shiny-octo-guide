<!-- /apps/web/src/views/Customers.vue -->

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/vue/24/outline'
import type { Customer, CustomerOrder } from '../types/hardware'

// Dummy data (replace with API fetch later)
const customers = ref<Customer[]>([
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '0712345678',
    address: 'Dar es Salaam',
    registrationDate: '2025-01-15',
    totalOrders: 5,
    totalSpent: 2500000,
    notes: 'Loyal customer',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    registrationDate: '2025-03-22',
    totalOrders: 2,
    totalSpent: 800000,
  },
  // Add 10–15 more for testing pagination
])

// Dummy history for profiles (per customer ID)
const customerHistories = ref<Record<string, CustomerOrder[]>>({
  '1': [
    { id: 'order-1', date: '2025-02-10', total: 500000, itemsCount: 2, status: 'completed' },
    { id: 'order-2', date: '2025-04-05', total: 1000000, itemsCount: 3, status: 'completed' },
  ],
  '2': [
    { id: 'order-3', date: '2025-05-18', total: 800000, itemsCount: 1, status: 'pending' },
  ],
  // Add for other IDs
})

// Search
const searchQuery = ref('')

const filteredCustomers = computed(() => {
  if (!searchQuery.value) return customers.value
  const q = searchQuery.value.toLowerCase()
  return customers.value.filter(c => 
    c.name.toLowerCase().includes(q) || 
    c.email.toLowerCase().includes(q)
  )
})

// Sorting
type SortKey = keyof Customer
const sortKey = ref<SortKey>('name')
const sortAsc = ref(true)

const sortedCustomers = computed(() => {
  return [...filteredCustomers.value].sort((a, b) => {
    let valA = a[sortKey.value]
    let valB = b[sortKey.value]

    valA = valA ?? (typeof valA === 'number' ? 0 : '')
    valB = valB ?? (typeof valB === 'number' ? 0 : '')

    if (typeof valA === 'string' && typeof valB === 'string') {
      const comparison = valA.localeCompare(valB)
      return sortAsc.value ? comparison : -comparison
    }

    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortAsc.value ? valA - valB : valB - valA
    }

    return 0
  })
})

const toggleSort = (key: SortKey) => {
  if (sortKey.value === key) sortAsc.value = !sortAsc.value
  else {
    sortKey.value = key
    sortAsc.value = true
  }
  currentPage.value = 1
}

// Pagination
const currentPage = ref(1)
const perPage = 10

const paginatedCustomers = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return sortedCustomers.value.slice(start, start + perPage)
})

const totalPages = computed(() => Math.ceil(sortedCustomers.value.length / perPage))

watch(searchQuery, () => currentPage.value = 1)

// Modals
const showAddModal = ref(false)
const showProfileModal = ref(false)
const selectedCustomer = ref<Customer | null>(null)

const newCustomer = ref<Partial<Customer>>({})

const openAdd = () => {
  newCustomer.value = {}
  showAddModal.value = true
}

const openProfile = (customer: Customer) => {
  selectedCustomer.value = customer
  showProfileModal.value = true
}

const addCustomer = () => {
  const customer: Customer = {
    id: Date.now().toString(),
    name: newCustomer.value.name || '',
    email: newCustomer.value.email || '',
    phone: newCustomer.value.phone,
    address: newCustomer.value.address,
    registrationDate: new Date().toISOString().split('T')[0],
    totalOrders: 0,
    totalSpent: 0,
    notes: newCustomer.value.notes,
  }
  customers.value.push(customer)
  showAddModal.value = false
}
</script>

<template>
  <div class="space-y-6 p-6 bg-gray-50 min-h-screen">
    <!-- Toolbar -->
    <div class="flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg shadow border border-gray-200">
      <div class="relative flex-1 max-w-md">
        <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input v-model="searchQuery" placeholder="Search by name or email..." class="w-full pl-10 py-2 border rounded-lg" />
      </div>
      <button @click="openAdd" class="px-4 py-2 bg-indigo-600 text-white rounded flex items-center gap-2">
        <PlusIcon class="w-5 h-5" /> Add Customer
      </button>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th @click="toggleSort('name')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer">
              Name <ChevronUpIcon v-if="sortKey === 'name' && sortAsc" class="w-4 h-4 inline" /> <ChevronDownIcon v-if="sortKey === 'name' && !sortAsc" class="w-4 h-4 inline" />
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
            <th @click="toggleSort('totalOrders')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer">
              Total Orders <ChevronUpIcon v-if="sortKey === 'totalOrders' && sortAsc" class="w-4 h-4 inline" /> <ChevronDownIcon v-if="sortKey === 'totalOrders' && !sortAsc" class="w-4 h-4 inline" />
            </th>
            <th @click="toggleSort('totalSpent')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer">
              Total Spent <ChevronUpIcon v-if="sortKey === 'totalSpent' && sortAsc" class="w-4 h-4 inline" /> <ChevronDownIcon v-if="sortKey === 'totalSpent' && !sortAsc" class="w-4 h-4 inline" />
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registered</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="customer in paginatedCustomers" :key="customer.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ customer.name }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ customer.email }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ customer.phone || '—' }}</td>
            <td class="px-6 py-4 text-sm text-gray-900">{{ customer.totalOrders }}</td>
            <td class="px-6 py-4 text-sm text-gray-900">{{ customer.totalSpent.toLocaleString() }} TZS</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ customer.registrationDate }}</td>
            <td class="px-6 py-4 text-sm">
              <button @click="openProfile(customer)" class="text-indigo-600 hover:text-indigo-900">View Profile</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="p-4 border-t flex justify-between text-sm text-gray-600">
        <button @click="currentPage--" :disabled="currentPage === 1" class="disabled:opacity-50">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="currentPage++" :disabled="currentPage === totalPages" class="disabled:opacity-50">Next</button>
      </div>
    </div>

    <!-- Add Modal -->
    <dialog v-if="showAddModal" class="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center" open>
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 class="text-lg font-semibold mb-4">Add New Customer</h3>
        <form @submit.prevent="addCustomer" class="space-y-4">
          <input v-model="newCustomer.name" placeholder="Name" required class="w-full p-2 border rounded" />
          <input v-model="newCustomer.email" type="email" placeholder="Email" required class="w-full p-2 border rounded" />
          <input v-model="newCustomer.phone" placeholder="Phone" class="w-full p-2 border rounded" />
          <input v-model="newCustomer.address" placeholder="Address" class="w-full p-2 border rounded" />
          <textarea v-model="newCustomer.notes" placeholder="Notes" class="w-full p-2 border rounded" />
          <div class="flex justify-end gap-2">
            <button type="button" @click="showAddModal = false" class="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </dialog>

    <!-- Profile Modal -->
    <dialog v-if="showProfileModal" class="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center" open>
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
        <h3 class="text-lg font-semibold mb-4">Customer Profile: {{ selectedCustomer?.name }}</h3>
        <div class="space-y-4">
          <p><strong>Email:</strong> {{ selectedCustomer?.email }}</p>
          <p><strong>Phone:</strong> {{ selectedCustomer?.phone || 'N/A' }}</p>
          <p><strong>Address:</strong> {{ selectedCustomer?.address || 'N/A' }}</p>
          <p><strong>Registered:</strong> {{ selectedCustomer?.registrationDate }}</p>
          <p><strong>Total Orders:</strong> {{ selectedCustomer?.totalOrders }}</p>
          <p><strong>Total Spent:</strong> {{ selectedCustomer?.totalSpent.toLocaleString() }} TZS</p>
          <p><strong>Notes:</strong> {{ selectedCustomer?.notes || 'None' }}</p>

          <h4 class="font-medium mt-6">Purchase History</h4>
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-100">
                <th class="p-2 text-left">Date</th>
                <th class="p-2 text-left">Total</th>
                <th class="p-2 text-left">Items</th>
                <th class="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in customerHistories[selectedCustomer?.id ?? 0] || []" :key="order.id" class="border-t">
                <td class="p-2">{{ order.date }}</td>
                <td class="p-2">{{ order.total.toLocaleString() }} TZS</td>
                <td class="p-2">{{ order.itemsCount }}</td>
                <td class="p-2">{{ order.status }}</td>
              </tr>
              <tr v-if="!customerHistories[selectedCustomer?.id ?? '']?.length">
                <td colspan="4" class="p-2 text-center text-gray-500">No purchase history yet</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex justify-end mt-6">
          <button @click="showProfileModal = false" class="px-4 py-2 border rounded">Close</button>
        </div>
      </div>
    </dialog>
  </div>
</template>