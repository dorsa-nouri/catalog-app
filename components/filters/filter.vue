<template>
  <div>
    <select
      v-model="selectedCategory"
      @change="$emit('filter', selectedCategory)"
      class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">All Categories</option>
      <option
        v-for="cat in categories"
        :key="cat"
        :value="cat"
      >
        {{ cat }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
  const { getCategoryList } = useProducts();

  const categories = await getCategoryList();

  const selectedCategory = ref("");

  defineEmits<{
    (e: "filter", category: string): void;
  }>();
</script>
