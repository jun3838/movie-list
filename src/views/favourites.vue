<script lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
// component
import MovieItem from '../components/movie-item/index.vue'

// helper
import { toggleFavourite } from '../helper'

// type
import type { Favourite } from '../types'

export default {
  components: {
    MovieItem
  },
  setup () {
    const favourites: Ref<Favourite[]> = ref(JSON.parse(localStorage.getItem('favourites') || '[]'))
    return {
      // data
      favourites,

      // methods
      toggleFavourite
    }
  }
}
</script>
<template>
  <p class="text-3xl font-bold">Favourites</p>
  <div class="grid grid-cols-5 gap-4 mt-3">
    <movie-item
      v-for="(favourite, idx) in favourites"
      :key="`movie-${idx + 1}`"
      :title="favourite.title"
      :year="favourite.year"
      :imdb-id="favourite.imdbId"
      :favourites="favourites"
      @toggle-favourite="toggleFavourite(favourites, $event)"
    />
  </div>
</template>