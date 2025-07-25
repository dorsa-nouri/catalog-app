<template>
    <div>{{ productId }}</div>
</template>
<script>
const route = useRoute()
const productId = route.params.productId
</script>