<script lang="ts">
// components
import { onMounted, computed, ref } from 'vue'
import Sprite from './components/sprite.vue'
import SearchBar from './components/search-bar/index.vue'
import MenuList from './components/menu-list/index.vue'

export default {
  components: {
    Sprite,
    SearchBar,
    MenuList
  },
  setup() {
    function isMobileDevice() {
      // According to some source, userAgent is not always reliable, e.g. iPads nowadays want to
      // be treated as desktops and thus send the same UA in Safari as the Desktop Safari
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
      }

      // Check for touch events
      // Check for viewport width
      // Check for accelerometer or gyroscope support
      if (
        ('ontouchstart' in window || navigator.maxTouchPoints > 0) &&
        window.matchMedia("(max-width: 767px)").matches &&
        (window.DeviceOrientationEvent || window.DeviceMotionEvent)
      ) {
        return true;
      }

      // Not a mobile browser
      return false;
    }

    const d = ref()

    onMounted(() => {
      d.value = `
      is Mobile: ${isMobileDevice()} <br/>
      touch: ${'ontouchstart' in window || navigator.maxTouchPoints > 0} <br/>
      size: ${window.matchMedia("(max-width: 767px)").matches} | ${window.innerWidth} <br/>
      event: ${('DeviceOrientationEvent' in window || 'DeviceMotionEvent' in window)} <br/>
      orientation: ${screen.orientation.type}
      `
    })

    return {
      d
    }
  }
}
</script>
<template>
  <Sprite/>
  <div class="flex content h-100">
    <div class="sidepanel h-full w-48">
      <menu-list />
      <div style="color: white" v-html="d" />
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
