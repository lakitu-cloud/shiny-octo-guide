<script setup lang="ts">
import { computed } from 'vue'

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

// Pure CSS donut chart data (percentages must sum to 100)
const stockBreakdown = [
  { label: 'Warehouse Stock', percent: 45, color: 'bg-purple-600' },
  { label: 'In Production', percent: 35, color: 'bg-teal-500' },
  { label: 'Retail Store', percent: 20, color: 'bg-amber-500' },
]

const donutStyle = computed(() => {
  let cumulative = 0
  const segments = stockBreakdown.map((item) => {
    const start = cumulative
    cumulative += item.percent
    return `${item.color} ${start}% ${cumulative}%`
  })
  return `conic-gradient(${segments.join(', ')}, #e5e7eb 0 100%)`
})

const topProducts = [
  { name: 'Rompi Berankang', price: '$160.98', sales: '1.7x sales', code: 'KOG-668-75', multiplier: '1.7x' },
  { name: 'Rumpi Berkancing', price: '$180.98', sales: 'KOG sales', code: 'KOG-696-95' },
  { name: 'Blazer assorted pocket', price: '$800.78', sales: '900 sales', code: '' },
  { name: 'Pattern top with knot', price: '$150.98', sales: '770 sales', code: 'KOG-649-75' },
  { name: 'Basic Hoodie - blue', price: '$140.99', sales: '512 sales', code: '' },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Top Stats Cards -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="stat in stats"
        :key="stat.title"
        class="bg-white overflow-hidden shadow rounded-lg border border-gray-200"
      >
        <div class="px-4 py-5 sm:p-6">
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
    <div class="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <!-- Total Order Overview -->
      <div class="lg:col-span-2 bg-white shadow rounded-lg border border-gray-200">
        <div class="px-6 py-5 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Total Order Overview</h3>
          <p class="mt-1 text-sm text-gray-500">
            Last updated: 3rd May, 2025
          </p>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-green-50 border border-green-200 rounded-lg p-5">
              <h4 class="text-sm font-medium text-green-800">New Orders</h4>
              <p class="mt-2 text-3xl font-bold text-green-900">{{ newOrders.count }}</p>
              <p class="mt-1 text-sm text-green-700">
                last order: {{ newOrders.date }}
              </p>
            </div>

            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-2">Revenue</h4>
              <p class="text-2xl font-semibold">{{ revenueTrend.current }}</p>
              <p :class="['text-sm mt-1', revenueTrend.changeColor]">
                {{ revenueTrend.change }}
              </p>
            </div>

            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-2">Average Order</h4>
              <p class="text-2xl font-semibold">{{ avgOrder.value }}</p>
              <p :class="['text-sm mt-1', avgOrder.changeColor]">
                {{ avgOrder.change }}
              </p>
            </div>
          </div>

          <!-- Fake sparkline / area chart -->
          <div class="mt-6">
            <h4 class="text-sm font-medium text-gray-700 mb-3">Statistics</h4>
            <div class="h-48 bg-gradient-to-t from-teal-100 to-transparent rounded-lg relative overflow-hidden">
              <div class="absolute inset-0 opacity-40">
                <!-- Very simple fake curve using gradient -->
                <div class="w-full h-full bg-gradient-to-r from-teal-400/30 via-teal-500/50 to-teal-600/40" />
              </div>
              <div class="absolute bottom-0 left-0 right-0 h-3/5 bg-gradient-to-t from-teal-500/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      <!-- Stock Unit Donut -->
      <div class="bg-white shadow rounded-lg border border-gray-200">
        <div class="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900">Stock Unit</h3>
          <select class="text-sm border-gray-300 rounded-md">
            <option>Month</option>
            <option>Quarter</option>
            <option>Year</option>
          </select>
        </div>
        <div class="p-8 flex flex-col items-center">
          <div
            class="w-48 h-48 rounded-full relative"
            :style="{ background: donutStyle }"
          >
            <div class="absolute inset-4 bg-white rounded-full flex items-center justify-center">
              <div class="text-center">
                <p class="text-3xl font-bold text-gray-900">100%</p>
                <p class="text-sm text-gray-500">Total Inventory</p>
              </div>
            </div>
          </div>

          <div class="mt-8 w-full space-y-3">
            <div
              v-for="item in stockBreakdown"
              :key="item.label"
              class="flex items-center justify-between text-sm"
            >
              <div class="flex items-center">
                <span :class="['w-3 h-3 rounded-full mr-2', item.color]" />
                {{ item.label }}
              </div>
              <span class="font-medium">{{ item.percent }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Most Selling Products -->
    <div class="bg-white shadow rounded-lg border border-gray-200">
      <div class="px-6 py-5 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Most Selling Products</h3>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-6">
        <div
          v-for="product in topProducts"
          :key="product.name"
          class="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
        >
          <h4 class="font-medium text-gray-900 mb-1">{{ product.name }}</h4>
          <p class="text-lg font-semibold text-indigo-700">{{ product.price }}</p>
          <p class="text-sm text-gray-600 mt-2">{{ product.sales }}</p>
          <p v-if="product.code" class="text-xs text-gray-500 mt-1">{{ product.code }}</p>
        </div>
      </div>
    </div>
  </div>
</template>