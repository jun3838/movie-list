<script lang="ts">
export default {
  setup (_, { emit }) {
    return {
      onInput: (e: KeyboardEvent) => {
        // emit out custom event with search keyword
        emit('search', (e.target as HTMLInputElement).value)
      }
    }
  }
}
</script>
<template>
  <div class="search-wrapper flex items-center rounded-full px-5 py-2">
    <input
      class="text-xs w-48 italic"
      placeholder="Type to Search..."
      @input="onInput"/>
    <svg class="icon w-4 h-4">
      <use xlink:href="#search-outline"></use>
    </svg>
  </div>
</template>
<style lang="scss" scoped>
.search-wrapper {
  background-color: #FFFFFF;

  & input {
    background-color: transparent;
    outline: transparent;
  }
}
</style>
