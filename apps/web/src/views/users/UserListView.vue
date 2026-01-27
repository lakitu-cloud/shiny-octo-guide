<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { dummyUsers, deleteUser } from '../../data/dummyData';
import type { User } from '../../../../../packages/shared/types';

const router = useRouter();
const users = ref<User[]>(dummyUsers);

function confirmDelete(id: string) {
  if (confirm('Are you sure you want to delete this user?')) {
    try {
      deleteUser(id);
      users.value = users.value.filter(u => u.id !== id);
    } catch (e) {
      alert('Error deleting user');
    }
  }
}
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Users</h1>
      <router-link to="/users/create" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create User</router-link>
    </div>
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.role }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.createdAt }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
              <router-link :to="`/users/${user.id}`" class="text-blue-600 hover:text-blue-900">View</router-link>
              <router-link :to="`/users/${user.id}/edit`" class="text-indigo-600 hover:text-indigo-900">Edit</router-link>
              <button @click="confirmDelete(user.id)" class="text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>