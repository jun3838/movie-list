import type { Favourite } from '../types'

export function toggleFavourite (favourites: Favourite[], { title, year, imdbId }: { title: string; year: number; imdbId: string }) {
  if (favourites.find(item => item.imdbId === imdbId)) {
    favourites.splice(favourites.findIndex(item => item.imdbId === imdbId), 1)
  } else {
    favourites.push({ title, year, imdbId })
  }
  localStorage.setItem('favourites', JSON.stringify(favourites))
}
export function isMobileDevice() {
  // According to some source, userAgent is not always reliable, e.g. iPads nowadays want to
  // be treated as desktops and thus send the same UA in Safari as the Desktop Safari
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return true;
  }

  // Check for touch events
  // Check for viewport width
  if (
    ('ontouchstart' in window || navigator.maxTouchPoints > 0) &&
    window.innerWidth < 1024
    // window.matchMedia("(max-width: 1023px)").matches
  ) {
    return true;
  }

  // Not a mobile browser
  return false;
}