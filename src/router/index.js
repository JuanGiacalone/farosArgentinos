import Vue from 'vue'
import VueRouter from 'vue-router'
import ListaAndMapa from '../components/ListaAndMapa.vue'
import About from '../components/About.vue'
import Contact from '../components/Contact.vue'
import Contribute from '../components/Contribute.vue'
 // importes dinamicos
const FaroAndCommentsLazy = () => import('../components/FaroAndComments.vue')

import { PiniaVuePlugin } from 'pinia'
Vue.use(PiniaVuePlugin)

Vue.use(VueRouter)

const router = new VueRouter({

  // more comments here
  mode: 'hash',
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
    {
     path: '/about',
     name: 'About',
     component: About
   },
   {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/contribute',
    name: 'Contribute',
    component: Contribute
  }
  ]
})


export default router
