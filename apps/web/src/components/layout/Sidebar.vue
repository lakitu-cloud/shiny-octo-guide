<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import {
  ChartBarIcon,
  WrenchScrewdriverIcon,
  CubeIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  DocumentTextIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/vue/24/outline'

defineProps<{
  isCollapsed: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

const route = useRoute()

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: ChartBarIcon },
  { path: '/products',  label: 'Products',  icon: WrenchScrewdriverIcon },
  { path: '/orders',     label: 'Orders',     icon: CubeIcon },
  { path: '/customers', label: 'Customers', icon: UsersIcon },
  { path: '/invoices', label: 'Invoice', icon: ClipboardDocumentListIcon },
  { path: '/users',   label: 'Users',   icon: DocumentTextIcon },
] as const

const isActive = (path: string) => {
  if (path === '/dashboard') return route.path === path
  return route.path.startsWith(path)
}
</script>

<template>
  <aside
    :class="[
      'bg-white border-r border-gray-200 flex flex-col h-full transition-all duration-300 ease-in-out',
      isCollapsed ? 'w-16' : 'w-64'
    ]"
  >
    <!-- Header / Logo + Toggle -->
    <div class="h-16 border-b border-gray-100 flex items-center justify-between px-4">
      <div v-if="!isCollapsed" class="text-xl font-semibold text-gray-900 tracking-tight">
        HMS
      </div>
      <div v-else class="text-xl font-bold text-indigo-600 mx-auto">H</div>

      <button
        @click="emit('toggle')"
        class="
          p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          transition-colors
        "
        :title="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      >
        <ChevronLeftIcon v-if="!isCollapsed" class="w-5 h-5" />
        <ChevronRightIcon v-else class="w-5 h-5" />
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 pt-4 px-3 space-y-1 overflow-y-auto">
      <RouterLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        :class="[
          'flex items-center rounded-lg transition-colors duration-150 group',
          isCollapsed ? 'justify-center py-3' : 'px-4 py-3',
          isActive(item.path)
            ? 'bg-indigo-50 text-indigo-700'
            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
        ]"
      >
        <component
          :is="item.icon"
          class="w-6 h-6 flex-shrink-0"
          :class="[
            isCollapsed ? '' : 'mr-3',
            isActive(item.path) ? 'text-indigo-600' : 'text-gray-500 group-hover:text-gray-600'
          ]"
        />

        <span
          v-if="!isCollapsed"
          class="font-medium"
        >
          {{ item.label }}
        </span>
      </RouterLink>
    </nav>

    <!-- Bottom spacer / future user section -->
    <div class="p-4 border-t border-gray-100 mt-auto" />
  </aside>
</template>