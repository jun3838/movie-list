<script lang="ts">
// components
import Sprite from './components/sprite.vue'
import SearchBar from './components/search-bar.vue'
import MenuList from './components/menu-list.vue'

export default {
  components: {
    Sprite,
    SearchBar,
    MenuList
  }
}
</script>
<template>
  <Sprite/>
  <div class="flex content h-100">
    <div class="sidepanel h-full w-48">
      <menu-list />
    </div>
    <div class="movie-section p-8 overflow-scroll">
      <router-view/>
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
  height: 100%;
}
.movie-section {
  width: calc(100% - 192px);
}
.sidepanel {
  background-color: #37383B;
}
</style>
