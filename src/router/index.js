import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BrandGuide from '../views/BrandGuide.vue'
import Recent from '../views/Recent.vue'
import Favourites from '../views/Favourites.vue'
import Files from '../views/Files.vue'
import FileDetail from '../views/FileDetail.vue'
import Settings from '../views/Settings.vue'
import Test from '../views/Test.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/BrandGuide',
      name: 'brandguide',
      component: BrandGuide
    },
    {
      path: '/Recent',
      name: 'recent',
      component: Recent
    },
    {
      path: '/Favourites',
      name: 'favourites',
      component: Favourites
    },
    {
      path: '/Files/:filter',
      name: 'files',
      component: Files
    },
    {
      path: '/Files/Detail/:name',
      component: FileDetail
    },
    {
      path: '/Settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/Test',
      component: Test
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
