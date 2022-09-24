import './scss/main.scss'
import Vue from 'vue';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);


import App from './App.vue'
import router from './router'

import './assets/main.css'

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
