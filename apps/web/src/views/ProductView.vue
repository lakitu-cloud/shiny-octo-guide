<!-- /apps/web/src/views/Products.vue -->

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import StockProgress from '../components/ui/StockProgress.vue'
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ViewColumnsIcon,
  Squares2X2Icon,
  PlusIcon,
} from '@heroicons/vue/24/outline'

import type { HardwareItem } from '../types/hardware'

// Local extension for this page
interface Product extends HardwareItem {
  category: string
  stockLevel: number
  maxStock: number
  imageUrl?: string
  batchNumber: string
}

// Dummy data
const products = ref<Product[]>([
  {
    id: '1',
    assetTag: 'LAP-001',
    type: 'laptop',
    brand: 'Dell',
    model: 'XPS 13',
    serialNumber: 'SN123456',
    status: 'active',
    location: 'Office A',
    assignedTo: 'ENOCK',
    category: 'Computers',
    stockLevel: 7,
    maxStock: 10,
    imageUrl: 'https://placehold.co/100x100?text=LAPTOP',
    batchNumber: 'BATCH-001',
  },
  {
    id: '2',
    assetTag: 'MON-001',
    type: 'monitor',
    brand: 'LG',
    model: 'UltraWide 34"',
    status: 'repair',
    category: 'Displays',
    stockLevel: 2,
    maxStock: 5,
    imageUrl: 'https://placehold.co/100x100?text=MONITOR',
    batchNumber: 'BATCH-002',
  },
  {
    id: '3',
    assetTag: 'PRN-001',
    type: 'peripheral',
    brand: 'HP',
    model: 'LaserJet Pro',
    status: 'active',
    category: 'Printers',
    stockLevel: 4,
    maxStock: 4,
    imageUrl: 'https://placehold.co/100x100?text=PRINTER',
    batchNumber: 'BATCH-003',
  },
  {
    id: '4',
    assetTag: 'SRV-001',
    type: 'server',
    brand: 'Dell',
    model: 'PowerEdge R650',
    status: 'active',
    category: 'Servers',
    stockLevel: 1,
    maxStock: 2,
    imageUrl: 'https://placehold.co/100x100?text=SERVER',
    batchNumber: 'BATCH-004',
  },
  // Add more dummy items here for testing pagination (aim for 10–20)
])

// Search
const searchQuery = ref('')

const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) return products.value

  const query = searchQuery.value.toLowerCase().trim()

  return products.value.filter(product =>
    product.assetTag.toLowerCase().includes(query) ||
    product.brand.toLowerCase().includes(query) ||
    product.model.toLowerCase().includes(query)
  )
})

// Sorting
const sortColumn = ref<keyof Product>('assetTag')
const sortDirection = ref<'asc' | 'desc'>('asc')

const sortedProducts = computed(() => {
  return [...filteredProducts.value].sort((a, b) => {
    const valA = a[sortColumn.value]
    const valB = b[sortColumn.value]

    if (typeof valA === 'string' && typeof valB === 'string') {
      return sortDirection.value === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA)
    }

    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortDirection.value === 'asc'
        ? valA - valB
        : valB - valA
    }

    return 0
  })
})

const sortBy = (column: keyof Product) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}

// Pagination
const itemsPerPage = 5
const currentPage = ref(1)

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return sortedProducts.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => Math.max(1, Math.ceil(sortedProducts.value.length / itemsPerPage)))

// Reset page/sort on search change
watch(searchQuery, () => {
  currentPage.value = 1
})

// Modal
const addModal = ref<HTMLDialogElement | null>(null)
const newItem = ref<Partial<Product>>({})

const openAddModal = () => {
  newItem.value = {
    type: 'other',
    status: 'active',
    stockLevel: 0,
    maxStock: 10,
  }
  addModal.value?.showModal()
}

const closeAddModal = () => {
  addModal.value?.close()
}

const addNewItem = () => {
  const item: Product = {
    id: Date.now().toString(),  // Simple ID for dummy
    ...newItem.value,
    serialNumber: newItem.value.serialNumber || '',
    location: newItem.value.location || '',
    assignedTo: newItem.value.assignedTo || '',
    purchaseDate: newItem.value.purchaseDate || '',
    warrantyEnd: newItem.value.warrantyEnd || '',
  } as Product
  products.value.push(item)
  closeAddModal()
}

// View toggle
const isListView = ref(true)
</script>

<template>
  <div class="space-y-6 p-6 bg-gray-50 min-h-screen">
    <!-- Summary Cards -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="bg-white shadow rounded-lg p-4 border border-gray-200">
        <dt class="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Items</dt>
        <dd class="mt-1 text-2xl font-semibold text-gray-900">{{ products.length }}</dd>
      </div>
      <div class="bg-white shadow rounded-lg p-4 border border-gray-200">
        <dt class="text-sm font-medium text-gray-500 uppercase tracking-wide">Active</dt>
        <dd class="mt-1 text-2xl font-semibold text-green-600">{{ products.filter(p => p.status === 'active').length }}</dd>
      </div>
      <div class="bg-white shadow rounded-lg p-4 border border-gray-200">
        <dt class="text-sm font-medium text-gray-500 uppercase tracking-wide">Low Stock</dt>
        <dd class="mt-1 text-2xl font-semibold text-red-600">{{ products.filter(p => p.stockLevel < 3).length }}</dd>
      </div>
      <div class="bg-white shadow rounded-lg p-4 border border-gray-200">
        <dt class="text-sm font-medium text-gray-500 uppercase tracking-wide">In Repair</dt>
        <dd class="mt-1 text-2xl font-semibold text-amber-600">{{ products.filter(p => p.status === 'repair').length }}</dd>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div class="flex items-center gap-4 flex-1">
        <div class="relative flex-1 max-w-md">
          <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by tag, brand, model..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button class="p-2 hover:bg-gray-100 rounded-lg" title="Filters">
          <FunnelIcon class="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div class="flex items-center gap-4">
        <button class="p-2 hover:bg-gray-100 rounded-lg" title="Columns">
          <ViewColumnsIcon class="w-5 h-5 text-gray-600" />
        </button>
        <button @click="isListView = !isListView" class="p-2 hover:bg-gray-100 rounded-lg" title="Toggle View">
          <Squares2X2Icon v-if="isListView" class="w-5 h-5 text-gray-600" />
          <ViewColumnsIcon v-else class="w-5 h-5 text-gray-600" />
        </button>
        <button @click="openAddModal" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2">
          <PlusIcon class="w-5 h-5" /> Add Product
        </button>
      </div>
    </div>

    <!-- List View -->
    <div v-if="isListView" class="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th @click="sortBy('assetTag')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
              Asset Tag <span v-if="sortColumn === 'assetTag'">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th @click="sortBy('brand')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
              Brand <span v-if="sortColumn === 'brand'">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th @click="sortBy('model')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
              Model <span v-if="sortColumn === 'model'">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th @click="sortBy('category')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
              Category <span v-if="sortColumn === 'category'">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th @click="sortBy('batchNumber')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
              Batch Number <span v-if="sortColumn === 'batchNumber'">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th @click="sortBy('stockLevel')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
              Stock Level <span v-if="sortColumn === 'stockLevel'">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="product in paginatedProducts" :key="product.id" class="hover:bg-gray-100">
            <td class="px-6 py-4">
              <img :src="product.imageUrl" :alt="product.model" class="w-10 h-10 rounded" />
            </td>
            <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ product.assetTag }}</td>
            <td class="px-6 py-4 text-sm text-gray-900">{{ product.brand }}</td>
            <td class="px-6 py-4 text-sm text-gray-900">{{ product.model }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ product.category }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ product.batchNumber }}</td>
            <td class="px-6 py-4">
              <span :class="`px-2 py-1 text-xs rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`">{{ product.status }}</span>
            </td>
            <td class="px-6 py-4">
              <StockProgress :current="product.stockLevel" :max="product.maxStock" show-label />
            </td>
            <td class="px-6 py-4 text-sm">
              <button class="text-indigo-600 hover:text-indigo-900">Edit</button>
              <button class="text-red-600 hover:text-red-900 ml-4">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="p-4 border-t border-gray-200 flex justify-between text-sm">
        <button @click="currentPage--" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="currentPage++" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>

    <!-- Card View -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="product in paginatedProducts" :key="product.id" class="bg-white p-4 rounded shadow">
        <img :src="product.imageUrl" :alt="product.model" class="w-full h-32 object-cover rounded mb-4" />
        <h3 class="font-bold">{{ product.assetTag }}</h3>
        <p>{{ product.brand }} {{ product.model }}</p>
        <p>Category: {{ product.category }}</p>
        <p>Batch: {{ product.batchNumber }}</p>
        <p>Status: {{ product.status }}</p>
        <StockProgress :current="product.stockLevel" :max="product.maxStock" show-label />
      </div>
      <div class="col-span-full flex justify-between mt-4 text-sm">
        <button @click="currentPage--" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="currentPage++" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>

    <!-- Add Modal -->
    <dialog ref="addModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Add New Hardware</h3>
        <div class="py-4">
          <input v-model="newItem.assetTag" placeholder="Asset Tag" class="input input-bordered w-full mb-2" />
          <input v-model="newItem.brand" placeholder="Brand" class="input input-bordered w-full mb-2" />
          <input v-model="newItem.model" placeholder="Model" class="input input-bordered w-full mb-2" />
          <!-- Add more fields as needed -->
        </div>
        <div class="modal-action">
          <button class="btn" @click="addNewItem">Save</button>
          <button class="btn" @click="addModal.close()">Cancel</button>
        </div>
      </div>
    </dialog>
  </div>
</template>