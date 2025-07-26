<template>
  <div
    class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 w-full sm:w-auto"
  >
    <label
      for="sort"
      class="text-sm font-medium text-gray-700"
    >
      Sort by:
    </label>
    <select
      id="sort"
      class="w-auto px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      v-model="selected"
      @change="emitSort"
    >
      <option
        disabled
        value=""
      >
        Select
      </option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="rating-asc">Rating: Low to High</option>
      <option value="rating-desc">Rating: High to Low</option>
    </select>
  </div>
</template>

<script setup lang="ts">
  const selected = ref("");

  const emit = defineEmits<{
    (e: "sort", sortBy: string, direction: "asc" | "desc"): void;
  }>();

  const emitSort = () => {
    const [sortBy, direction] = selected.value?.split("-");
    emit("sort", sortBy, direction as "asc" | "desc");
  };
</script>
