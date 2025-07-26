<template>
  <div>
    <Loading v-if="status === 'pending'" />
    <div
      v-else-if="status === 'error'"
      class="p-8 text-red-600 text-center"
    >
      Error: {{ error.message }}
    </div>

    <div
      v-else-if="product"
      class="max-w-6xl mx-auto p-6 space-y-10"
    >
      <div class="flex flex-col md:flex-row gap-8">
        <img
          :src="product.thumbnail"
          alt="Product image"
          class="w-full md:w-1/2 rounded-xl object-cover"
        />
        <div
          class="flex flex-col justify-around sm:space-y-2 space-y-4 md:w-1/2"
        >
          <h1 class="text-3xl font-bold">{{ product.title }}</h1>
          <p class="text-gray-700">{{ product.description }}</p>
          <div class="flex items-center gap-4">
            <span class="text-xl font-semibold text-green-600"
              >${{ product.price }}</span
            >
            <span class="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
              -{{ product.discountPercentage }}%
            </span>
          </div>
          <div class="text-sm text-gray-500">
            <p>
              Brand: <strong>{{ product.brand }}</strong>
            </p>
            <p>
              Category: <strong>{{ product.category }}</strong>
            </p>
            <p>
              SKU: <strong>{{ product.sku }}</strong>
            </p>
            <p>
              Stock:
              <span
                :class="product.stock < 10 ? 'text-red-500' : 'text-green-500'"
              >
                {{ product.stock }} ({{ product.availabilityStatus }})
              </span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-lg font-semibold mb-2">Tags</h2>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in product.tags"
            :key="tag"
            class="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg shadow"
      >
        <div>
          <p><strong>Rating:</strong> {{ product.rating }}/5</p>
          <p><strong>Warranty:</strong> {{ product.warrantyInformation }}</p>
          <p><strong>Return Policy:</strong> {{ product.returnPolicy }}</p>
          <p>
            <strong>Shipping Info:</strong> {{ product.shippingInformation }}
          </p>
        </div>
        <div>
          <p><strong>Weight:</strong> {{ product.weight }}g</p>
          <p>
            <strong>Dimensions:</strong> {{ product.dimensions.width }} x
            {{ product.dimensions.height }} x {{ product.dimensions.depth }} cm
          </p>
          <p>
            <strong>Minimum Order Quantity:</strong>
            {{ product.minimumOrderQuantity }}
          </p>
          <p><strong>Barcode:</strong> {{ product.meta.barcode }}</p>
        </div>
      </div>

      <!--users reviews -->
      <div>
        <h2 class="text-lg font-semibold mb-4">Customer Reviews</h2>
        <div class="space-y-4">
          <div
            v-for="review in product.reviews"
            :key="review.reviewerEmail"
            class="border p-4 rounded-md shadow-sm"
          >
            <div class="flex justify-between items-center mb-2">
              <span class="font-semibold">{{ review.reviewerName }}</span>
              <span class="text-sm text-yellow-500">★ {{ review.rating }}</span>
            </div>
            <p class="text-gray-700 italic">"{{ review.comment }}"</p>
            <p class="text-xs text-gray-400 mt-1">
              {{ new Date(review.date).toLocaleDateString() }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Loading from "~/components/shared/loading.vue";

  const route = useRoute();
  const productId = route.params.productId;
  const { getById } = useProducts();

  const {
    data: product,
    status,
    error,
  } = await useAsyncData(`get-product-${productId}`, () => getById(productId), {
    server: true,
    lazy: false,
    immediate: true,
    default: () => null,
    staleTime: 10000,
  });
</script>
