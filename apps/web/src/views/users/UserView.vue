<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { dummyUsers, dummySales, getUserTurnover } from '../../data/dummyData';
import type { User, Sale } from '../../../../../packages/shared/types';

const route = useRoute();
const router = useRouter();
const user = ref<User | null>(null);
const sales = ref<Sale[]>([]);
const turnover = ref(0);

onMounted(() => {
  const foundUser = dummyUsers.find(u => u.id === route.params.id);
  if (!foundUser) {
    router.push('/users');
    return;
  }
  user.value = foundUser;
  sales.value = dummySales.filter(s => s.userId === foundUser.id);
  turnover.value = getUserTurnover(foundUser.id);
});
</script>

<template>
  <div v-if="user" class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">{{ user.name }}</h1>
        <router-link to="/users" class="text-blue-600 hover:underline">Back to Users</router-link>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <p class="text-sm text-gray-500">Email</p>
          <p class="font-medium">{{ user.email }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Role</p>
          <p class="font-medium capitalize">{{ user.role }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Created At</p>
          <p class="font-medium">{{ user.createdAt }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Turnover Sales</p>
          <p class="font-medium text-lg">TZS {{ turnover.toLocaleString() }}</p>
        </div>
      </div>
      <h2 class="text-xl font-semibold mb-4">Sales History</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="sale in sales" :key="sale.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ sale.date }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">TZS {{ sale.amount.toLocaleString() }}</td>
            </tr>
            <tr v-if="sales.length === 0">
              <td colspan="2" class="px-6 py-4 text-center text-sm text-gray-500">No sales yet</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div v-else class="p-6 text-center text-gray-600">
    User not found. <router-link to="/users" class="text-blue-600 hover:underline">Back to list</router-link>
  </div>
</template>