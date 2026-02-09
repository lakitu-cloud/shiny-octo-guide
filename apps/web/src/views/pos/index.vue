<script setup lang="ts">
import PosHeader from './Header.vue'
import ProductGrid from '../../components/ProductGrid.vue' // ← assume you have this from earlier
// import CartSidebar from '@/components/pos/CartSidebar.vue'
// import PosStatsCards from '@/components/pos/PosStatsCards.vue'
// import PosFilters from '@/components/pos/PosFilters.vue'
// import ProductSalesTable from '@/components/pos/ProductSalesTable.vue'
// import InvoiceTransactionsTable from '@/components/pos/InvoiceTransactionsTable.vue'

import { usePosUIStore } from '../../stores/posUI'
import { onMounted } from 'vue'

const posUI = usePosUIStore()

onMounted(() => {
  // Here you would normally fetch real data once
  // posUI.loadInitialData()
})
</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <PosHeader />

    <div class="flex flex-1 overflow-hidden">
      <!-- Left sidebar area -->
      <!-- <aside
        class="w-full lg:w-80 xl:w-96 bg-white border-r border-gray-200 overflow-y-auto"
      >
        <div v-if="!posUI.isTransactionsMode">
          <CartSidebar :items="posUI.cartItems" :subtotal="posUI.subtotal" />
        </div>
        <div v-else class="p-5">
          <h3 class="text-lg font-semibold mb-4">Quick Summary</h3>
          <p class="text-gray-600 text-sm">Use filters above to view specific data</p>
          <!-- You can add quick stats or actions here later -->
        <!-- </div> -->
      <!-- </aside> --> 

      <!-- Main content -->
      <main class="flex-1 overflow-y-auto">
        <!-- Point of Sale mode -->
        <div v-if="!posUI.isTransactionsMode" class="p-4 md:p-6">
          <ProductGrid
            :products="posUI.products"
            @add="posUI.addToCart"
          />
        </div>

        <!-- Transactions mode -->
        <div v-else class="p-4 md:p-6 space-y-6">
          <PosStatsCards :stats="posUI.stats" />
          <PosFilters />
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div class="p-4 border-b bg-gray-50 font-medium">Products Sold</div>
              <ProductSalesTable />
            </div>
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div class="p-4 border-b bg-gray-50 font-medium">Transactions</div>
              <InvoiceTransactionsTable />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>