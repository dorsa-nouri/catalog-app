<template>
  <div class="flex items-center gap-2">
    <label for="sort" class="text-sm font-medium text-gray-700">Sort by:</label>
    <select
      id="sort"
      class="border border-gray-300 rounded px-3 py-1 text-sm"
      v-model="selected"
      @change="emitSort"
    >
      <option disabled value="">Select</option>
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
  (e: 'sort', sortBy: string, direction: 'asc' | 'desc'): void;
}>();

const emitSort = () => {
  const [sortBy, direction] = selected.value.split("-");
  emit("sort", sortBy, direction as 'asc' | 'desc');
};
</script>
