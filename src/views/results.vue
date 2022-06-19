<script lang="ts">
import { reactive, ref, onMounted, watch } from 'vue'
import type { UnwrapRef, Ref } from 'vue'

// network
import { fetchMovie, MovieResponse } from '../network/movie'

// components
import Pagination from '../components/pagination/index.vue'
import MovieItem from '../components/movie-item/index.vue'
import SearchBar from '../components/search-bar/index.vue'

// helper
import { toggleFavourite } from '../helper'

// type
import type { Favourite } from '../types'

export default {
  components: {
    Pagination,
    MovieItem,
    SearchBar
  },
  setup () {
    // register reactive value
    const movieListResponse: UnwrapRef<MovieResponse>  = reactive({
      page: 0,
      per_page: 0,
      total: 0,
      total_pages: 0,
      data: []
    })
    const movies: Ref<MovieResponse['data'] | []> = ref([])
    const loading = ref(false)
    const searchValue = ref('')
    const favourites: Ref<Favourite[]> = ref(JSON.parse(localStorage.getItem('favourites') || '[]'))

    // initial load
    onMounted(async () => {
      getMovies({
        keyword: '',
        page: 1
      })
    })

    async function getMovies (payload: { keyword: string; page: number }) {
      loading.value = true
      const { page, per_page, total, total_pages, data } = await fetchMovie({
        keyword: payload.keyword,
        page: payload.page
      })
      movieListResponse.page = page
      movieListResponse.per_page = per_page
      movieListResponse.total = total
      movieListResponse.total_pages = total_pages
      movieListResponse.data = data
      movies.value = movieListResponse.data
      loading.value = false
    }

    async function onSearch (value: string) {
      searchValue.value = value
      getMovies({
        keyword: searchValue.value,
        page: 1
      })
    }

    function prevPage () {
      getMovies({
        keyword: searchValue.value,
        page: movieListResponse.page - 1
      })
    }

    function nextPage () {
      getMovies({
        keyword: searchValue.value,
        page: movieListResponse.page + 1
      })
    }

    function gotoPage (page: number) {
      getMovies({
        keyword: searchValue.value,
        page
      })
    }

    return {
      // data
      movies,
      movieListResponse,
      searchValue,
      loading,
      favourites,
      // methods
      onSearch,
      nextPage,
      prevPage,
      gotoPage,
      toggleFavourite
    }
  }
}
</script>
<template>
  <search-bar
    @search="onSearch"/>
  <hr class="mt-5" />
  <template v-if="loading">
    loading...
  </template>
  <template v-else>
    <div v-if="movies.length === 0">
      Your search <span class="italic font-bold">{{ searchValue }}</span> did not match any movie
    </div>
    <div class="movie-container grid grid-cols-5 gap-4 mt-3">
      <movie-item
        v-for="(movie, idx) in movies"
        :key="`movie-${idx + 1}`"
        :title="movie.Title"
        :year="movie.Year"
        :imdb-id="movie.imdbID"
        :favourites="favourites"
        @toggle-favourite="toggleFavourite(favourites, $event)"
      />
    </div>
  </template>
  <pagination
    v-if="movieListResponse.total > 1"
    :total-pages="movieListResponse.total_pages"
    :current-page="movieListResponse.page"
    class="flex justify-center mt-10"
    @next="nextPage"
    @prev="prevPage"
    @goto="gotoPage"/>
</template>