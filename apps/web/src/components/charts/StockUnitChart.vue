<!-- /apps/web/src/components/charts/StockUnitDonut.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutController
} from 'chart.js'

// Register only what we need (tree-shakable)
ChartJS.register(
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  Title
)

// -----------------------------------------------------------------------------
// Data & Config
// -----------------------------------------------------------------------------
const timeframe = ref<'Month' | 'Quarter' | 'Year'>('Month')

const stockBreakdown = ref([
  { label: 'Production', percent: 50, color: 'bg-green-500' },
  { label: 'Store',      percent: 20, color: 'bg-yellow-500' },
  { label: 'Stock',      percent: 30, color: 'bg-red-500'    }
])

// Computed chart data (reactive)
const chartData = computed(() => ({
  labels: stockBreakdown.value.map(item => item.label),
  datasets: [{
    data: stockBreakdown.value.map(item => item.percent),
    backgroundColor: [
      '#10B981', // green-500
      '#FBBF24', // yellow-400/500
      '#EF4444'  // red-500
    ],
    borderWidth: 0,
    hoverOffset: 8
  }]
}))

// Center text plugin
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw(chart: any) {
    const { ctx, width, height } = chart
    ctx.restore()

    const fontSize = (height / 220).toFixed(2) // responsive-ish
    ctx.font = `bold ${fontSize}em sans-serif`
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'

    const text = '100%'
    const textX = width / 2
    const textY = height / 2 - 10   // slightly above center

    ctx.fillStyle = '#111827' // gray-900
    ctx.fillText(text, textX, textY)

    // second line
    ctx.font = `${fontSize as any * 0.55}em sans-serif`
    ctx.fillStyle = '#6B7280' // gray-500
    ctx.fillText('Total Inventory', textX, textY + 22)

    ctx.save()
  }
}

// Chart options
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',           // donut hole size – adjust to taste (65-75%)
  plugins: {
    legend: { display: false },     // we show custom legend below
    tooltip: {
      callbacks: {
        label: (context: any) => `${context.label}: ${context.raw}%`
      }
    },
    // Register our custom plugin
    centerText: {}   // just needs to exist
  }
}))

// We need to pass the plugin instance to the chart
const plugins = [centerTextPlugin]
</script>

<template>
  <div class="lg:col-span-1 bg-white shadow rounded-lg border border-gray-200">
    <!-- Header -->
    <div class="px-6 py-3 border-b border-gray-200 flex justify-between items-center">
      <h3 class="text-md font-semibold text-gray-900">Stock Unit</h3>
      <select
        v-model="timeframe"
        class="text-sm border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option>Month</option>
        <option>Quarter</option>
        <option>Year</option>
      </select>
    </div>

    <!-- Chart + Legend -->
    <div class="p-8 flex flex-col items-center">
      <!-- Chart container with fixed aspect -->
      <div class="w-48 h-66">
        <Doughnut
          :data="chartData"
          :options="chartOptions"
          :plugins="plugins"
        />
      </div>

      <!-- Custom legend (matches your design) -->
      <div class="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
        <div
          v-for="item in stockBreakdown"
          :key="item.label"
          class="flex items-center text-sm text-gray-700"
        >
          <span
            :class="['w-3 h-3 rounded-full mr-2', item.color]"
          />
          {{ item.label }}
          <!-- Uncomment if you want percentages here too -->
          <!-- <span class="ml-1 font-medium">{{ item.percent }}%</span> -->
        </div>
      </div>
    </div>
  </div>
</template>