<template>
  <div class="p-6 max-w-sm mx-auto">
    <h2 class="text-lg font-semibold text-gray-700 mb-4">Loading...</h2>
    <div class="space-y-4">
      <div class="h-4 rounded bg-gray-300 relative overflow-hidden">
        <div
          class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/70 to-transparent"
        ></div>
      </div>
      <div class="h-4 rounded bg-gray-300 relative overflow-hidden w-5/6">
        <div
          class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/70 to-transparent"
        ></div>
      </div>
      <div class="h-4 rounded bg-gray-300 relative overflow-hidden w-4/6">
        <div
          class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/70 to-transparent"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
  .animate-shimmer {
    animation: shimmer 1.5s infinite;
  }
</style>
