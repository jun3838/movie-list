<script lang="ts">
import { debounce } from 'lodash-es'
export default {
  setup (_, { emit }) {
    return {
      onInput: debounce((e: KeyboardEvent) => {
        // emit out custom event with search keyword
        emit('search', (e.target as HTMLInputElement).value)
      }, 300)
    }
  }
}
</script>
<template>
  <div class="search-wrapper flex items-center rounded-full px-5 py-2 w-48">
    <input
      class="text-xs w-48 italic"
      placeholder="Search movie"
      @input="onInput"/>
    <svg class="icon w-4 h-4">
      <use xlink:href="#search-outline"></use>
    </svg>
  </div>
</template>
<style lang="scss" scoped>
.search-wrapper {
  background-color: #e5e5e5;

  & input {
    background-color: transparent;
    outline: transparent;
  }
}
</style>
