<template>
  <div class="bg-gray-50 min-h-screen p-6">
    <div
      class="flex flex-col sm:flex-row gap-4 w-full items-stretch sm:items-center sm:justify-between py-5"
    >
      <!-- filters -->
      <div
        class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center"
      >
        <FiltersSearch
          @search="onSearch"
          class="w-full sm:w-auto"
        />
        <FiltersFilter
          @filter="onFilter"
          class="w-full sm:w-auto"
        />
        <FiltersSort
          @sort="onSort"
          class="w-full sm:w-auto"
        />

        <button
          v-if="clearFilterBtn"
          @click="clearFilters"
          class="text-gray-600 px-5 py-2 border rounded-xl w-full sm:w-auto"
          aria-label="Clear search"
        >
          Clear Filters
        </button>
      </div>

      <!-- new product -->
      <div
        class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mt-3 sm:mt-0"
      >
        <button
          @click="showModal = true"
          class="btn py-2 px-5 bg-blue-600 rounded-xl text-white w-full sm:w-auto"
        >
          New Product
        </button>
        <SharedModalNewProductModal
          v-model:open="showModal"
          @submit="handleCreate"
        />
      </div>
    </div>

    <ProductProductsList
      :status="localStatus"
      :error="localError"
      :products="productList"
    />
  </div>
</template>

<script setup lang="ts">
  import { debounce } from "lodash-es";
  const { getAllProducts, search, getByCategory, getSorted, create } =
    useProducts();

  const query = ref("");
  const category = ref("");
  const productList = ref([]);
  const localStatus = ref("idle");
  const localError = ref("");
  const showModal = ref(false);
  const clearFilterBtn = ref(false);

  const { data, status, error, refresh } = await useAsyncData(
    "get-products",
    getAllProducts,
    {
      server: true,
      lazy: false,
      immediate: true,
      default: () => [],
      staleTime: 10000,
    }
  );

  productList.value = data.value ?? {};
  localStatus.value = status.value;
  localError.value = error.value;

  const clearFilters = async () => {
    clearFilterBtn.value = false;
    query.value = "";
    category.value = "";
    localStatus.value = "loading";
    localError.value = "";
    await refresh();
    productList.value = data.value ?? {};
  };

  const debouncedSearch = debounce(async (q: string) => {
    try {
      const result = await search(q);
      productList.value = result ?? {};
      localStatus.value = "success";
      localError.value = "";
    } catch (err) {
      localError.value = (err as Error)?.message || "Unknown error";
      localStatus.value = "error";
    }
  }, 500);

  const debouncedFilter = debounce(async (cat: string) => {
    try {
      if (cat === "all") {
        clearFilters();
      } else {
        const result = await getByCategory(cat);
        productList.value = result ?? {};
        localStatus.value = "success";
        localError.value = "";
      }
    } catch (err) {
      localError.value = (err as Error)?.message || "Unknown error";
      localStatus.value = "error";
    }
  }, 500);

  const onSearch = (q: string) => {
    query.value = q?.trim();
    category.value = "";
    localStatus.value = "loading";
    localError.value = null;
    clearFilterBtn.value = true;
    debouncedSearch(query.value);
  };

  const onFilter = (cat: string) => {
    category.value = cat;
    query.value = "";
    localStatus.value = "loading";
    localError.value = null;
    clearFilterBtn.value = true;
    debouncedFilter(category.value);
  };

  const onSort = async (sortBy: string, direction: "asc" | "desc") => {
    try {
      const result = await getSorted(sortBy, direction);
      productList.value = result ?? {};
      localStatus.value = "success";
      localError.value = "";
      clearFilterBtn.value = true;
    } catch (err) {
      localError.value = (err as Error)?.message || "Unknown error";
      localStatus.value = "error";
    }
  };

  const handleCreate = async (form: object) => {
    try {
      await create(form);
      localStatus.value = "success";
      localError.value = "";
    } catch (err) {
      localError.value = (err as Error)?.message || "Unknown error";
      localStatus.value = "error";
    }
  };
</script>
