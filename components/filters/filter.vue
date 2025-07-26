<template>
  <div>
    <select
      v-model="selectedCategory"
      @change="$emit('filter', selectedCategory)"
      class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="all">All Categories</option>
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
  const selectedCategory = ref("all");

  const { data: categories } = await useAsyncData(
    "product-categories",
    () => getCategoryList(),
    {
      server: true,
      lazy: false,
      immediate: true,
      default: () => [],
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );

  defineEmits<{
    (e: "filter", category: string): void;
  }>();
</script>
