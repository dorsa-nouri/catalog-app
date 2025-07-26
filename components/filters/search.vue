<template>
  <div>
    <input
      v-model="searchQuery"
      @input="emit('search', searchQuery)"
      type="text"
      placeholder="Search..."
      class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />


  </div>
</template>

<script setup lang="ts">
  const searchQuery = ref("");

  const emit = defineEmits<{
    (e: "search", query: string): void;
  }>();
</script>
