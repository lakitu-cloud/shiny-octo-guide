<script setup lang="ts">
import { ref, computed } from 'vue'
import { Line } from 'vue-chartjs'

// Dummy data – replace with real API / pinia store later
const monthlyData = ref([
  { month: 'Jan', value: 28000 },
  { month: 'Feb', value: 38000 },
  { month: 'Mar', value: 34000 },
  { month: 'Apr', value: 48000 },
  { month: 'May', value: 52000 },
  { month: 'Jun', value: 62000 },
  { month: 'Jul', value: 68000 },
])

const chartData = computed(() => ({
  labels: monthlyData.value.map(d => d.month),
  datasets: [
    {
      label: 'Revenue', // or Orders – doesn't show because legend hidden
      data: monthlyData.value.map(d => d.value),
      borderColor: 'rgb(13 148 136)',      // teal-600
      backgroundColor: (context: any) => {
        const chart = context.chart
        const { ctx, chartArea } = chart
        if (!chartArea) return null

        // Gradient from top (strong) to bottom (faint)
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
        gradient.addColorStop(0, 'rgba(45, 212, 191, 0.45)')   // teal-400 / ~45% opacity
        gradient.addColorStop(1, 'rgba(45, 212, 191, 0.05)')   // very transparent
        return gradient
      },
      fill: 'origin',       // fill to x-axis
      tension: 0.38,        // smooth curve – adjust 0.3–0.45
      pointRadius: 0,       // no visible dots
      borderWidth: 2.2,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(17, 24, 39, 0.92)',
      titleFont: { size: 14 },
      bodyFont: { size: 13 },
      padding: 10,
      callbacks: {
        label: (context: any) => `${(context.parsed.y / 1000).toFixed(0)}K`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: '#6b7280', // gray-500
        font: { size: 12 },
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: '#e5e7eb', // gray-200
        drawBorder: false,
      },
      ticks: {
        color: '#6b7280',
        font: { size: 12 },
        callback: (value: number) => `${Math.round(value / 1000)}K`,
        stepSize: 20000,
      },
    },
  },
  elements: {
    line: { tension: 0.38 },
  },
}

// Your existing data (adjusted slightly to match screenshot colors)
const newOrders = ref({
  count: 56,
  date: 'April 20, 2025',
})

const revenueTrend = ref({
  current: 'TZS 438,090',
  change: '+12.3% from last month',
  changeColor: 'text-red-600', // screenshot shows red – change if needed
})

const avgOrder = ref({
  value: 'TZS 67,000',
  change: '+11%',
  changeColor: 'text-green-600',
})
</script>

<template>
  <div class="bg-white rounded-lg border border-gray-200 flex flex-col h-full">
    <!-- Header -->
    <div class="px-4 mt-2 border-gray-200 flex items-center justify-between">
      <h3 class="text-md font-semibold text-gray-900">Statistics</h3>
      <select
        class="text-sm border border-gray-300 rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
        <option>31 Nov - 31 Dev</option>
        <option>Last 30 Days</option>
        <option>This Year</option>
      </select>
    </div>

    <!-- Content -->
  
      <div class="lg:col-span-3 flex flex-col">
        <div class="flex-grow min-h-[250px] relative px-4 mt-4 mb-2">
          <Line :data="chartData" :options="chartOptions" />
        </div>
      </div>
    </div>
</template>