<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
  >
    <SharedError v-if="status === 'pending'" />
    <div
      v-for="product in products?.products"
      :key="product.id"
    >
      <ProductProductsCard :details="product" />
    </div>
    <SharedNothingFound v-if="products?.total === 0" />
    <SharedError v-if="error" />
  </div>
</template>

<script setup>
  const prop = defineProps({
    products: { type: Object, required: true },
    status: { type: String, required: false },
    error: { type: String, required: false },
  });
</script>
