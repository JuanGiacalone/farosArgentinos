import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListaAndMapa from '../components/ListaAndMapa.vue'
import FaroAndComments from "../components/FaroAndComments.vue"

import { PiniaVuePlugin } from 'pinia'
Vue.use(PiniaVuePlugin)

Vue.use(VueRouter)

 // dynamic imports
 const FaroAndCommentsLazy = () => import('../components/FaroAndComments.vue');

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: ListaAndMapa
    },
    {
      path: '/faro/',
      name: 'faro',
      component: FaroAndCommentsLazy,
      props: true,

      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    },
    {
      path: '/farosargentinos',
      name: 'FarosArgentinos',
      component: ListaAndMapa
    }
  ]
})


export default router
