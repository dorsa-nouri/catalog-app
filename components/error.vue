<template>
  <div class="min-h-screen grid place-items-center bg-red-50 text-red-600">
    <div>
      <h1 class="text-3xl font-bold">Oops! Something went wrong.</h1>
      <p>{{ error.message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ error: any }>();
</script>
