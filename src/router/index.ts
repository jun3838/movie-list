import { createRouter, createWebHistory } from 'vue-router'
import Results from '../views/results/index.vue'
import Favourites from '../views/favourites/index.vue'

const routes = [
  {
    path: '/',
    name: 'Movies',
    component: Results
  },
  {
    path: '/favourites',
    name: 'Favourites',
    component: Favourites
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
