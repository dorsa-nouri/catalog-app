<template>
  <Transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
    >
      <div
        class="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6 relative sm:h-auto h-screen"
        @click.stop
      >
        <button
          class="absolute top-3 right-3 text-gray-500 hover:text-black"
          @click="emit('update:open', false)"
        >
          ✕
        </button>

        <h2 class="text-xl font-bold mb-4">Create New Product</h2>

        <form
          @submit.prevent="submitForm"
          class="space-y-4"
        >
          <div>
            <label class="block text-sm font-medium">Title</label>
            <input
              v-model="form.title"
              required
              type="text"
              class="input"
            />
          </div>

          <div>
            <label class="block text-sm font-medium">Price</label>
            <input
              v-model.number="form.price"
              required
              type="number"
              class="input"
            />
          </div>

          <div>
            <label class="block text-sm font-medium">Category</label>

            <select
              v-model="form.category"
              class="input"
            >
              <option
                v-for="cat in categories"
                :key="cat"
                :value="cat"
              >
                {{ cat }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium">Description</label>
            <textarea
              v-model="form.description"
              rows="3"
              class="input"
            ></textarea>
          </div>

          <div
            class="flex sm:flex-row flex-col justify center w-auto sm:justify-end gap-2 pt-4"
          >
            <button
              type="button"
              @click="emit('update:open', false)"
              class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup>
  const emit = defineEmits(["update:open", "submit"]);
  const props = defineProps({
    open: Boolean,
  });
  const { getCategoryList } = useProducts();

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

  const form = ref({
    title: "",
    price: 0,
    category: "",
    description: "",
  });

  const submitForm = () => {
    emit("submit", { ...form.value });
    emit("update:open", false);
    form.value = { title: "", price: 0, category: "", description: "" };
  };
</script>

<style scoped>
  .input {
    @apply mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.25s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
