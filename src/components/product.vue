<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    seller: {
      type: String,
      required: true
    }
  }
}
</script>
<template>
  <div class="thumbnail flex flex-col p-3 rounded-md hover:bg-gray-100 cursor-pointer">
    <img
      class="w-50"
      loading="lazy"
      :src="`src/assets/products/${image}`" />
    <span class="product-name text-sm text-zinc-500">{{ name }}</span>
    <span class="product-seller text-xs text-gray-400">by {{ seller }}</span>
  </div>
</template>
