<script lang="ts">
import { PropType } from 'vue'

// type
import type { Favourite } from '../../types'
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    imdbId: {
      type: String,
      required: true
    },
    favourites: {
      type: Array as PropType<Favourite[]>,
      required: true
    }
  },
  setup (props) {
    function getIconSymbol (imdbId: string) {
      return props.favourites.find(item => item.imdbId === imdbId)
        ? '#heart-fill'
        : '#heart'
    }
    return {
      getIconSymbol
    }
  }
}
</script>
<template>
  <div class="thumbnail relative rounded-md flex flex-col p-3 rounded-md hover:bg-gray-100 cursor-pointer">
    <span class="title text-lg font-medium">{{ title }}</span>
    <span class="year text-sm text-zinc-500">Year: {{ year }}</span>
    <span class="imdb-id text-xs text-gray-400">imdb ID: {{ imdbId }}</span>
    <svg
      class="icon w-6 h-6 absolute right-2 bottom-2"
      @click="$emit('toggle-favourite', { title, year, imdbId })">
      <use :xlink:href="getIconSymbol(imdbId)"></use>
    </svg>
  </div>
</template>
<style lang="scss" scoped>
.thumbnail {
  border: 1px solid rgb(212, 210, 210);

  &:hover {
    transition: transform .4s ease;
    transform: scale(1.04);
  }
}
</style>
