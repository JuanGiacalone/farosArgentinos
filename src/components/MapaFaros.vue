<template>
  <div class="row map">
    <l-map
      @update:zoom="zoomUpdate"
      @update:center="centerUpdate"

      :zoom="zoom" 
      :center="center">

      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker
       :key="index"
       v-for="faro, index in faros" 
       :lat-lng="latLng(faro.coordenadas.coordinates[0], faro.coordenadas.coordinates[1] )"
       :name="faro.nombre"
       >
       <l-popup>{{faro.nombre}}</l-popup>
        <l-icon
        :icon-size = "faro.iconSize"
        :icon-url = "icon"
        >
        </l-icon>
        <a class="headline">{{faro.nombre}}</a>
      </l-marker>
    </l-map>
  </div>
</template>
<script>
 import L from 'leaflet'
 import {  LMap, LTileLayer, LMarker, LIcon, LPopup} from 'vue2-leaflet'
 import iconoFarito from '../assets/faro.svg'

export default {
  name: "MapaFaros",
  components: { LMap, LTileLayer, LMarker, LIcon, LPopup },
  data: function () {
    return {
      zoom:5,
      center: L.latLng(-41.94434618654884, -62.15707946259374),
      currentCenter: L.latLng(-41.94434618654884, -62.15707946259374),
      currentZoom: 4,
      url:'https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=166ddc60b6b04768acb4662c580d4a70',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.413220, -1.219482),
      icon:iconoFarito,
      iconSize: [25,25]
    }
  },
  props: {
    faros: Array
  },
  methods: {
    latLng: function (lat, lng) {
      return L.latLng(lat,lng)
    },
    centerUpdate: function (center) {
      this.currentCenter = center
    },
    zoomUpdate: function (zoom) {
      this.currentZoom = zoom 
    }

  },

}
</script>
<style lang="scss" scoped>
  .map {
    height: 80vh;
  }
  l-icon {
    color:red
  }
</style>