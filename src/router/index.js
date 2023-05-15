import Vue from 'vue'
import VueRouter from 'vue-router'
import ListaAndMapa from '../components/ListaAndMapa.vue'
// import AboutView from '../components/HelloWorld.vue'

import { PiniaVuePlugin } from 'pinia'
Vue.use(PiniaVuePlugin)

Vue.use(VueRouter)

 // importes dinamicos
 const FaroAndCommentsLazy = () => import('../components/FaroAndComments.vue');

const router = new VueRouter({

  // more comments here
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

    },
    {
      path: '/farosargentinos',
      name: 'FarosArgentinos',
      component: ListaAndMapa
    },
    // {
    //   path: '/about',
    //   name: 'About',
    //   component: AboutView
    // }
  ]
})


export default router
