<script>
import sprite from '../assets/sprite.svg?raw'
export default {
  setup () {
    return {
      sprite
    }
  }
}
</script>
<template>
  <svg
    v-html="sprite"
    class="svg-symbol"
  ></svg>
</template>
<style lang="scss">
.svg-symbol {
  position: absolute;
  top: 0px;
  z-index: -1;
}
</style>