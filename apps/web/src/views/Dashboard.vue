<script setup lang="ts">
import { computed, ref } from 'vue'
import OrderChart from '../components/charts/OrderChart.vue'
import StockUnitChart from '../components/charts/StockUnitChart.vue'
import TopProductsGrid from '../components/grid/TopProductsGrid.vue'

// ── Dummy data (replace later with API / store)
const stats = [
  {
    title: 'TOTAL SALES',
    value: 'TZS 820,245',
    change: '+0.5% from last week',
    changeColor: 'text-green-600',
    icon: '💰',
  },
  {
    title: 'TOTAL ORDERS',
    value: '1,256',
    change: '+1.0% from last week',
    changeColor: 'text-green-600',
    icon: '📦',
  },
  {
    title: 'NOT SALES', // assuming "Not Sold" or similar
    value: 'Not Sales',
    change: '',
    changeColor: '',
    icon: '🛑',
  },
  {
    title: 'TOTAL VARIANT',
    value: '456K',
    change: '+26% from last week',
    changeColor: 'text-green-600',
    icon: '📊',
  },
]

const revenueTrend = computed(() => ({
  current: 'TZS 438,090',
  change: '+12.3% from last month',
  changeColor: 'text-green-600',
}))

const avgOrder = computed(() => ({
  value: 'TZS 67,000',
  change: '+11%',
  changeColor: 'text-green-600',
}))

const newOrders = computed(() => ({
  count: 56,
  date: 'April 20, 2025',
  changeColor: 'text-green-600',
}))


const topProducts = ref([
  {
    name: 'Cement 50kg ',
    price: 'TZS 18,500',
    sales: '1.4x avg',
    stock: '92',
    image: 'https://images.unsplash.com/photo-1581092160560-1c1e428e9d65?w=400&auto=format&fit=crop&q=80' 
  },
  {
    name: 'Y10 Rebar 12mm (6m)',
    price: 'TZS 32,000',
    sales: '980 units',
    stock: '68',
    image: 'https://images.unsplash.com/photo-1581092162387-4c9a5b0a9f5d?w=400&auto=format&fit=crop&q=80' 
  },
  {
    name: 'Common Nails 4 inch (1kg)',
    price: 'TZS 4,200',
    sales: '2.1x sales',
    stock: '85',
    image: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=400&auto=format&fit=crop&q=80' // nails / fasteners close-up
  },
  {
    name: 'Binding Wire 2.5mm Roll',
    price: 'TZS 12,800',
    sales: '650 rolls',
    stock: '45',
    image: 'https://images.unsplash.com/photo-1581092160560-1c1e428e9d65?w=400&auto=format&fit=crop&q=80' // wire coil (reuse similar industrial)
  },
  {
    name: 'Galvanized Chain Link Fence 6ft',
    price: 'TZS 85,000',
    sales: '420m sold',
    stock: '',
    image: 'https://images.unsplash.com/photo-1581093458795-4d1e0a4b0a9f?w=400&auto=format&fit=crop&q=80' // fence mesh roll
  },
  {
    name: 'Concrete Blocks 6 inch (Solid)',
    price: 'TZS 1,800 each',
    sales: '4,500 units',
    stock: '',
    image: 'https://images.unsplash.com/photo-1581092162387-4c9a5b0a9f5d?w=400&auto=format&fit=crop&q=80' // cinder/concrete blocks stack
  }
])
</script>

<template>
  <div class="space-y-2">
    <!-- Top Stats Cards -->
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="stat in stats" :key="stat.title"
        class="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
        <div class="px-4 py-3 sm:p-6">
          <div class="flex items-center justify-between">
            <div>
              <dt class="text-sm font-medium text-gray-500 uppercase tracking-wide">
                {{ stat.title }}
              </dt>
              <dd class="mt-1 text-2xl font-semibold text-gray-900">
                {{ stat.value }}
              </dd>
            </div>
            <div class="text-3xl opacity-70">{{ stat.icon }}</div>
          </div>
          <p :class="['mt-2 text-sm', stat.changeColor]">
            {{ stat.change }}
          </p>
        </div>
      </div>
    </div>

    <!-- Middle Section: Overview + Stock Donut -->
    <div class="grid grid-cols-1 gap-2 lg:grid-cols-3">
      <!-- Total Order Overview -->
      <div class="lg:col-span-2 bg-white shadow rounded-lg border border-gray-200">
        <div class="px-6 py-3 flex justify-between items-center border-b border-gray-200">
          <h3 class="text-md font-semibold text-gray-900">Total Order Overview</h3>
          <p class="mt-1 text-sm text-gray-500">
            Last updated: 3rd May, 2025
          </p>
        </div>

        <div class="p-4 flex-grow grid grid-cols-1 lg:grid-cols-4 gap-2">
          <!-- Left column: Key metrics -->
          <div class="lg:col-span-1 space-y-3">
            <div class="bg-green-500 rounded-lg p-3">
              <h4 class="text-sm font-medium text-white">New Orders</h4>
              <p class="mt-2 text-3xl font-bold text-white">{{ newOrders.count }}</p>
              <p class="mt-1 text-sm text-white">
                last order: {{ newOrders.date }}
              </p>
            </div>

            <div class="border border-green-500 p-3 rounded-lg">
              <h4 class="text-sm font-medium  text-gray-700 mb-2">Revenue</h4>
              <p class="text-2xl font-semibold">{{ revenueTrend.current }}</p>
              <p :class="['text-sm mt-1', revenueTrend.changeColor]">
                {{ revenueTrend.change }}
              </p>
            </div>

            <div class="border border-green-500 p-3 rounded-lg">
              <h4 class="text-sm font-medium text-gray-700 mb-2">Average Order</h4>
              <p class="text-2xl font-semibold">{{ avgOrder.value }}</p>
              <p :class="['text-sm mt-1', avgOrder.changeColor]">
                {{ avgOrder.change }}
              </p>
            </div>
          </div>

          <!-- Right column: Chart -->
          <div class="lg:col-span-3 flex flex-col">
            <div class="flex-grow relative min-h-[240px]">
              <OrderChart />
            </div>
          </div>
        </div>
      </div>

      <!-- Stock Unit Donut -->
      <StockUnitChart />

    </div>

    <!-- Most Selling Products -->
    <div class="bg-white shadow rounded-lg border border-gray-200">
      <div class="px-6 py-3 border-b border-gray-200">
        <h3 class="text-md font-semibold text-gray-900">Most Selling Products</h3>
      </div>
      <TopProductsGrid :top-products="topProducts" />
    </div>
  </div>
</template>