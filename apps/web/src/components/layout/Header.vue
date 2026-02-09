<script setup lang="ts">
import { BellIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'

defineProps<{
  isSidebarCollapsed: boolean
}>()

// Mock user & logout (replace with real auth later)
const user = { name: 'ENOCK' }
const logout = () => {
  console.log('Logout clicked')
  // router.push('/login') etc.
}
</script>

<template>
  <header
    class="px-6 py-3 flex items-center justify-between sticky top-0 z-10 transition-all duration-300"
    :class="{ 'pl-20': isSidebarCollapsed }"  >
    <!-- Left side -->
    <h2 class="text-xl font-semibold text-gray-900">
      Welcome, <span class="text-green-700">{{ user.name || 'Guest' }}</span>
    </h2>

    <!-- Right side -->
    <div class="flex items-center gap-6">
      <button
        class="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"
        aria-label="Notifications"
      >
        <BellIcon class="w-6 h-6" />
      </button>

      <div class="flex items-center gap-3">
        <UserCircleIcon class="w-8 h-8 text-gray-600" />
        <span class="font-medium text-gray-800 hidden sm:inline">{{ user.name }}</span>
        <button
          @click="logout"
          class="text-gray-500 hover:text-red-600 p-1 rounded-full focus:outline-none"
          aria-label="Sign out"
        >
          <ArrowRightOnRectangleIcon class="w-6 h-6" />
        </button>
      </div>
    </div>
  </header>
</template>