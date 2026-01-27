<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  current: number
  max: number
  showLabel?: boolean      // optional: show numbers like "7 / 10"
}>()

const percentage = computed(() => {
  if (props.max === 0) return 0
  return Math.min(100, Math.max(0, (props.current / props.max) * 100))
})

const barColor = computed(() => {
  if (percentage.value > 50) return 'bg-green-600'
  if (percentage.value > 20) return 'bg-amber-500'
  return 'bg-red-600'
})
</script>

<template>
  <div class="space-y-1">
    <div class="w-full bg-gray-200 rounded-full h-2.5">
      <div
        :class="['h-2.5 rounded-full transition-all duration-300', barColor]"
        :style="{ width: `${percentage}%` }"
      ></div>
    </div>
    <div v-if="showLabel" class="text-xs text-gray-600 text-right">
      {{ current }} / {{ max }} ({{ Math.round(percentage) }}%)
    </div>
  </div>
</template>