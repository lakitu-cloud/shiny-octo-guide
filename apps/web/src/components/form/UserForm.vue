<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { dummyUsers, upsertUser } from '../../data/dummyData';
import type { User } from '../../../../../packages/shared/types';

const router = useRouter();
const route = useRoute();
const isEdit = ref(!!route.params.id);
const form = ref<Partial<User>>({
  name: '',
  email: '',
  role: 'sales',
});

onMounted(() => {
  if (isEdit.value) {
    const user = dummyUsers.find(u => u.id === route.params.id);
    if (user) form.value = { ...user };
    else router.push('/users');
  }
});

function save() {
  if (!form.value.name || !form.value.email || !form.value.role) {
    alert('Name, email and role are required');
    return;
  }

  try {
    upsertUser({
      id: isEdit.value ? (route.params.id as string) : undefined,
      name: form.value.name,
      email: form.value.email,
      role: form.value.role,
      password: form.value.password, // only sent on create or explicit change
    });
    router.push('/users');
  } catch (err) {
    alert(err instanceof Error ? err.message : 'Failed to save user');
  }
}   
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h1 class="text-2xl font-bold mb-6">{{ isEdit ? 'Edit User' : 'Create User' }}</h1>
      <form @submit.prevent="save" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input v-model="form.name" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="form.email" type="email" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Role</label>
          <select v-model="form.role" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500">
            <option value="admin">Admin</option>
            <option value="sales">Sales</option>
          </select>
        </div>
        <div v-if="!isEdit">
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="form.password" type="password" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500" required />
        </div>
        <div class="flex justify-end space-x-3">
          <router-link to="/users" class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">Cancel</router-link>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>