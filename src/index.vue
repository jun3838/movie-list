<script lang="ts">
import { computed, ref } from 'vue'
import type { Ref } from 'vue'

// components
import Sprite from './components/sprite.vue'
import SearchBar from './components/search-bar.vue'
import MenuList from './components/menu-list.vue'
import Profile from './components/profile.vue'
import Product from './components/product.vue'

// ideally this should be a request to grab product list
import productList from './data/product-list.json'

export default {
  components: {
    Sprite,
    SearchBar,
    MenuList,
    Profile,
    Product
  },
  setup () {
    // register reactive value
    const searchValue: Ref<string> = ref('')
    // computed value reacting to changes
    const filteredProductList = computed(() => {
      const filteredList = productList.filter(product => product.name.toLowerCase().includes(searchValue.value.toLowerCase()))
      return filteredList.length === 0
        ? productList
        : filteredList
    })

    function onSearch (value: string) {
      searchValue.value = value
    }
    return {
      filteredProductList,
      onSearch
    }
  }
}
</script>
<template>
  <Sprite/>
  <div class="flex">
    <div class="logo flex h-14 w-48 text-white font-serif font-medium justify-center items-center">Westeros</div>
    <div class="topbar grow h-14 flex items-center justify-between">
      <search-bar
        class="ml-8"
        @search="onSearch"/>
      <profile class="mr-8"/>
    </div>
  </div>
  <div class="flex content">
    <div class="sidepanel h-full w-48">
        <menu-list />
    </div>
    <div class="product-section p-8 overflow-scroll">
      <p class="text-zinc-700">Products</p>
      <hr />
      <div class="product-container grid grid-cols-5 gap-4 overflow-scroll mt-3">
        <product
          v-for="(item, idx) in filteredProductList"
          :key="`product-${idx + 1}`"
          :name="item.name"
          :image="item.image"
          :seller="item.seller"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.logo {
  background-color: #0070E0;
}
.topbar {
  background-color: #F1F1F1;
}
.content {
  height: calc(100% - 56px);
}
.product-section {
  width: calc(100% - 192px);
}
.sidepanel {
  background-color: #37383B;
}
</style>
