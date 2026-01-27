<script setup lang="ts">
import { ref } from 'vue'
import { dummyInvoices, dummyCustomers } from '../../data/dummyData'   // ← Import here
import type { Invoice, Customer } from '../../../../../packages/shared/types'

const invoices = ref<Invoice[]>(dummyInvoices)
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Invoices</h1>
      <router-link
        to="/invoices/create"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Create New Invoice
      </router-link>
    </div>

    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="inv in invoices" :key="inv.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ inv.number }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ dummyCustomers.find((c: Customer) => c.id === inv.customerId)?.name || 'Unknown' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ inv.date }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ inv.dueDate }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              TZS {{ inv.total.toLocaleString('en-US') }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-yellow-100 text-yellow-800': inv.status === 'draft',
                  'bg-green-100 text-green-800': inv.status === 'paid',
                  'bg-blue-100 text-blue-800': inv.status === 'sent'
                }"
              >
                {{ inv.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <router-link :to="`/invoices/${inv.id}`" class="text-blue-600 hover:text-blue-900">View</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>