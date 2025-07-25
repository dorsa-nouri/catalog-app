<template>
  <div class="bg-gray-50 min-h-screen p-6">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <loading v-if="status === 'pending'" />
      <div
        v-for="product in products?.products"
        :key="product.id"
      >
        <products-card :details="product" />
      </div>
      <nothingFound v-if="products?.total === 0" />
      <error v-if="error" />
    </div>
  </div>
</template>

<script setup lang="ts">
  const { getAllProducts } = useProducts();

  const {
    data: products,
    status,
    error,
    refresh,
  } = await useAsyncData(
    "get-products",
    async () => {
      const response = await getAllProducts();
      return response || [];
    },
    {
      server: true,
      lazy: false,
      immediate: true,
      default: () => [],
      staleTime: 10000,
    }
  );
</script>
