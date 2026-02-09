<script setup lang="ts">
import ProductCard from '../../../web/src/components/card/ProductCard.vue'
import type { PropType } from 'vue'

defineProps({
  products: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
})

const emit = defineEmits<{
  (e: 'add', product: any): void
}>()
</script>

<template>
  <div class="space-y-6">
    <!-- Controls -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex-1 max-w-md">
        <input
          type="text"
          placeholder="Search product by name, barcode..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <select
        class="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-primary-500 focus:border-primary-500"
      >
        <option>All Categories</option>
        <!-- Populate from API / store later -->
        <option>Antibiotics</option>
        <option>Analgesics</option>
        <option>Antihypertensives</option>
      </select>
    </div>

    <!-- Grid -->
    <div
      v-if="products.length === 0"
      class="text-center py-12 text-gray-500"
    >
      No products found
    </div>

    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add="emit('add', $event)"
      />
    </div>
  </div>
</template>