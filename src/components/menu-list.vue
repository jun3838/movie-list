<template>
  <ul class="text-white text-sm">
    <router-link to="/">
      <li class="flex ml-10 mt-5 items-center cursor-pointer">
        <svg class="icon w-4 h-4 mr-2">
          <use xlink:href="#search-outline"></use>
        </svg>
        Search
      </li>
    </router-link>
    <router-link to="/favourites">
      <li class="flex ml-10 mt-5 items-center cursor-pointer">
        <svg class="icon w-4 h-4 mr-2">
          <use xlink:href="#briefcase-outline"></use>
        </svg>
          Favourites
      </li>
    </router-link>
  </ul>
</template>
<style lang="scss" scoped>
.icon {
  fill: #FFFFFF;
}
</style>