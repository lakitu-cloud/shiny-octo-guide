<template>
  <div class="min-h-screen flex flex-col relative overflow-hidden">
    <!-- Background image or gradient -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-gray-100 via-green-200 to-gray-100"
      aria-hidden="true"
    ></div>

    <!-- Blur overlay layer -->
    <div
      class="absolute inset-0 backdrop-blur-xl bg-white/30"
      aria-hidden="true"
    ></div>

    <!-- Content -->
    <main class="relative flex-1 flex flex-col min-h-0 z-10">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
// empty for now
</script>

<style scoped>
/* Fallback for browsers without backdrop-filter */
@supports not (backdrop-filter: blur(20px)) {
  .backdrop-blur-xl {
    background: rgba(255, 255, 255, 0.75);
  }
}
</style>
