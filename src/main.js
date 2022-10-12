import './scss/main.scss'
import  Vue from 'vue';
import Vuex from "vuex";
import App from './App.vue'
import router from './router'
import store  from "./stores/farosAndComentarios.js"
import './assets/main.css'
import LazyComponent from 'v-lazy-component'
import { BootstrapVue, IconsPlugin, ToastPlugin } from 'bootstrap-vue'




import { LMap, LTileLayer, LMarker, LTooltip } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-tooltip', LTooltip);

export const eventBus = new Vue();
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(ToastPlugin)

Vue.use(LazyComponent)

new Vue({
  
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

