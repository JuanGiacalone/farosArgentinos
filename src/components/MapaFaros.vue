<template>
  <div class="row map">

    <l-map
      @update:zoom="zoomUpdate"
      @update:center="centerUpdate"
      :zoom="zoom" 
      :center="center">

      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker
       :key="idFaro"
       v-for="faro, idFaro in faros" 
       :lat-lng="latLng(faro.coordenadas.coordinates[0], faro.coordenadas.coordinates[1] )"
       :name="faro.nombre"
       >
       
       <l-popup>{{faro.nombre}} {{faro.iconSize}}</l-popup>
        <l-icon

        :icon-size = faro.iconSize
        :icon-url = "icon"
        >
        
        </l-icon>
        <a class="headline">{{faro.nombre}}</a>
        <l-tooltip>{{faro.nombre}}</l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>
<script>
 import L from 'leaflet'
 import {  LMap, LTileLayer, LMarker, LIcon, LPopup} from 'vue2-leaflet'
 import iconoFarito from '../assets/faro.svg'
 import { mapGetters } from "vuex";
 import {eventBus} from "../main";

export default {
  
  name: "MapaFaros",
  components: { LMap, LTileLayer, LMarker, LIcon, LPopup },
  data: function () {
    return {
      zoom:5,
      center: L.latLng(-41.94434618654884, -62.15707946259374),
      currentCenter: L.latLng(-41.94434618654884, -62.15707946259374),
      currentZoom: 4,
      url:'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      icon:iconoFarito,
      iconSize: [40,40]
    }
  },
  //  props: {
  //  faros: Array
  //  },
  methods: {
    
    latLng: function (lat, lng) {
      return L.latLng(lat,lng)
    },
    centerUpdate: function (center) {
      this.currentCenter = center
    },
    zoomUpdate: function (zoom) {
      this.currentZoom = zoom 
    },
     mouseOverFaro: function (index) {
        // let faro = this.faros.find(faro.idFaro === index
       
        console.log('over desde mapa' + index);
        //   console.log(faro.idFaro);
        //   faro.iconSize = this.largeIcon;
      },
      mouseLeftFaro: function (index) {
        // let faro = this.faros.find(faro.idFaro === index)
        //   faro.iconSize = this.normalIcon;
        // this.faros[index].iconSize = this.normalIcon;
        
      },

    },

 computed: {
   ...mapGetters(['faros']),
   dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15];
    }
 },
  created() {
    eventBus.$on('mouse-over-faro', (message) => {
   });
   },



}
</script>
<style lang="scss" scoped>
  .map {
    height: 80vh;
  }

</style>