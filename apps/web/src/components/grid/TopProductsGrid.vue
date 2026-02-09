<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  topProducts: {
    type: Array as PropType<Array<{
      name: string
      price: string 
      sales: string
      image: string
      stock?: string // optional, percentage string e.g. "75"
    }>>,
    required: true,
    default: () => []
  }
})
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 p-3">
    <div
      v-for="product in topProducts"
      :key="product.name"
      class="border border-gray-200 rounded-lg p-3 bg-white hover:shadow-md transition-shadow duration-200 flex flex-col"
    >
      <!-- Product Image -->
      <div class="h-32 flex items-center justify-center mb-4 bg-gray-50 rounded overflow-hidden rounded-lg">
        <img
          :src="product.image || 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&auto=format&fit=crop&q=80'"
          :alt="product.name"
          class="max-h-full max-w-full object-cover"
          loading="lazy"
        />
      </div>

      <!-- Name -->
      <h4 class="font-semibold text-sm text-gray-900 mb-2 line-clamp-2 ">
        {{ product.name }}
      </h4>

      <!-- Price & Sales -->
      <div class="flex items-baseline justify-between ">
        <p class="text-sm font-semibold text-green-700">
          {{ product.price }}
        </p>
        <p class="text-sm text-gray-600">
          {{ product.sales }}
        </p>
      </div>

      <!-- Stock Progress Bar -->
      <div v-if="product.stock" class="mt-3">

        <div class="h-2.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            class="h-full bg-green-600 rounded-full transition-all duration-500"
            :style="{ width: `${product.stock}%` }"
          ></div>
        </div>
      </div>

      <div v-else class="mt-auto text-xs text-gray-400 italic">
        No stock data
      </div>
    </div>
  </div>
</template>