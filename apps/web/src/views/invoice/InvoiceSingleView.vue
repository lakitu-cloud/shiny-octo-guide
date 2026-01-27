<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { dummyInvoices, dummyCustomers, dummyProducts } from '../../data/dummyData'
import type { Invoice } from '../../../../../packages/shared/types'

const route = useRoute()
const router = useRouter()

const invoice = ref(
  dummyInvoices.find(inv => inv.id === route.params.id as string) || null
)

if (!invoice.value) {
  router.push('/invoices')
}

const printInvoice = () => {
  window.print()
}
</script>

<template>
  <div v-if="invoice" class="p-6 bg-gray-50 min-h-screen print:bg-white print:p-8">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8 print:shadow-none print:border-none">
      <!-- Header -->
      <div class="flex justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">INVOICE</h1>
          <p class="text-gray-600 mt-1">{{ invoice.number }}</p>
        </div>
        <div class="text-right">
          <p class="font-medium">Hardware Management System</p>
          <p class="text-sm text-gray-600">Dar es Salaam, Tanzania</p>
        </div>
      </div>

      <!-- Dates & Customer -->
      <div class="grid grid-cols-2 gap-8 mb-10">
        <div>
          <h3 class="text-sm font-medium text-gray-500 uppercase mb-2">Bill To</h3>
          <p class="font-medium">{{ dummyCustomers.find(c => c.id === invoice?.customerId)?.name }}</p>
          <p class="text-sm text-gray-600">
            {{ dummyCustomers.find(c => c.id === invoice?.customerId)?.address }}
          </p>
          <p class="text-sm text-gray-600">{{ dummyCustomers.find(c => c.id === invoice?.customerId)?.email }}</p>
        </div>
        <div class="text-right space-y-2">
          <p><span class="font-medium">Date:</span> {{ invoice.date }}</p>
          <p><span class="font-medium">Due Date:</span> {{ invoice.dueDate }}</p>
          <p>
            <span class="font-medium">Status:</span>
            <span class="ml-2 px-3 py-1 rounded-full text-xs"
              :class="{
                'bg-yellow-100 text-yellow-800': invoice.status === 'draft',
                'bg-green-100 text-green-800': invoice.status === 'paid'
              }">
              {{ invoice.status }}
            </span>
          </p>
        </div>
      </div>

      <!-- Items -->
      <div class="mb-10">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-300">
              <th class="text-left py-3 font-medium">Description</th>
              <th class="text-center py-3 font-medium">Qty</th>
              <th class="text-right py-3 font-medium">Unit Price</th>
              <th class="text-right py-3 font-medium">Disc.</th>
              <th class="text-right py-3 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in invoice.items" :key="item.productId" class="border-b">
              <td class="py-4">
                {{ dummyProducts.find(p => p.id === item.productId)?.name }}
              </td>
              <td class="text-center py-4">{{ item.quantity }}</td>
              <td class="text-right py-4">
                TZS {{ dummyProducts.find(p => p.id === item.productId)?.price.toLocaleString() }}
              </td>
              <td class="text-right py-4">{{ item.discount }}%</td>
              <td class="text-right py-4 font-medium">
                TZS {{
                  (
                    (dummyProducts.find(p => p.id === item.productId)?.price || 0) *
                    item.quantity *
                    (1 - item.discount / 100)
                  ).toLocaleString()
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Totals -->
      <div class="flex justify-end">
        <div class="w-80 space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600">Subtotal</span>
            <span>TZS {{ invoice.subtotal.toLocaleString() }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">VAT (18%)</span>
            <span>TZS {{ invoice.tax.toLocaleString() }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Shipping</span>
            <span>TZS {{ invoice.shipping.toLocaleString() }}</span>
          </div>
          <div class="flex justify-between pt-4 border-t font-bold text-lg">
            <span>Total</span>
            <span>TZS {{ invoice.total.toLocaleString() }}</span>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-12 text-center text-sm text-gray-500 print:mt-20">
        Thank you for your business • Payment due within 14 days
      </div>
    </div>

    <div class="mt-6 text-center print:hidden">
      <button @click="printInvoice" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Print / Download PDF
      </button>
    </div>
  </div>
</template>