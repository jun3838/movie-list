import type { Favourite } from '../types'

export function toggleFavourite (favourites: Favourite[], { title, year, imdbId }: { title: string; year: number; imdbId: string }) {
  if (favourites.find(item => item.imdbId === imdbId)) {
    favourites.splice(favourites.findIndex(item => item.imdbId === imdbId), 1)
  } else {
    favourites.push({ title, year, imdbId })
  }
  localStorage.setItem('favourites', JSON.stringify(favourites))
}