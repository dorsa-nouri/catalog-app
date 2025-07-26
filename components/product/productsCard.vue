<script setup lang="ts">
  const prop = defineProps({
    details: { type: Object, required: true },
  });
</script>

<template>
  <NuxtLink :to="`/product/${details?.id}`">
  <div class="min-h-auto bg-gray-100 p-10 rounded-xl">
    <div
      class="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition p-2"
    >
      <img
        :src="details?.thumbnail"
        :alt="details?.title"
        class="w-full h-48 object-contain"
      />
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-700 truncate">
          {{ details?.title }}
        </h3>
        <p class="text-gray-500 text-sm line-clamp-2 h-10">
          {{ details?.description }}
        </p>
        <div class="flex justify-between items-center mt-4">
          <span class="text-blue-600 font-bold text-lg"
            >${{ details?.price }}</span
          >
          <span class="text-sm text-yellow-500">⭐ {{ details?.rating }}</span>
        </div>
      </div>
    </div>
  </div>
  </NuxtLink>
</template>
