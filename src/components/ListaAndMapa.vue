<template>
  <KeepAlive>


  <div class="container-fluid">

    <div class="row">
      
      <div class="col-3 ">
        <div class="input-group input-group mb-3">
          <div>
            <b-dropdown id="dropdown-1" :text="searchFilter"  class="m-md-2 " >
              <b-dropdown-item  @click="filterSearch('Nombre',false)" > Nombre</b-dropdown-item>
              <b-dropdown-item  @click="filterSearch('Provincia',false)">Provincia</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="filterSearch('Acceso Libre',true)">Acceso Libre</b-dropdown-item>
              <b-dropdown-item @click="filterSearch('Acceso Restringido',true)">Acceso Restringido</b-dropdown-item>
              <b-dropdown-item @click="filterSearch('Acceso Gratuito',true)">Acceso Gratuito</b-dropdown-item>
              <b-dropdown-item @click="filterSearch('Acceso Pago',true)">Acceso Pago</b-dropdown-item>


            </b-dropdown>
          </div>
                      <!-- Se bindea el input a una variable  -->
          <input type="text" v-model="searchQuery" placeholder="Buscar..." class="form-control"  
          aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" :disabled="textInputDisabled" >
        </div>
          <!-- Se bindean nuevamente los eventos externos a metodos locales -->
          <!-- Se envian los faros Filtrados a la clase hija que se encarga de mostrarlos -->
       <!-- <ListaFaros 
       
       @mouse-over-faro = "mouseOverFaro"
       @mouse-left-faro = "mouseLeftFaro"
       :faros = "farosFiltrados"/> -->
       <div class="card faros-list" style="width: fit-content"  >
        <ul class="list-group list-group-flush">
    
           <!--  Se bindean los eventos de html con metodos locales que reciben el indice afectado-->
          <li
              @mouseover="mouseOver(idFaro)" 
              @mouseleave="mouseLeave(idFaro)"
              v-for="faro, idFaro in farosFiltrados" :key="faro.idFaro"
          class="list-group-item"
          >   <router-link :to="{ name: 'faro' , params: { faro: faro }}">{{faro.nombre}}</router-link> {{faro.coordenadas.coordinates}} {{faro.idFaro}} {{faro.iconSize}}</li>
        </ul>
        
      </div>

      </div>
      <!-- col6 -->
      <div class="col-7">
        <!-- Se pasa el Array faros como prop -->
       <!-- <MapaFaros :faros = "faros"/>  -->
      <!-- <MapaFaros :faros = "farosFiltrados"/> -->
      <div class="row map">

        <l-map
          @update:zoom="zoomUpdate"
          @update:center="centerUpdate"
          :zoom="zoom" 
          :center="center">
    
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker
           
           v-for="faro in farosFiltrados" :key="faro.idFaro"
           :lat-lng="latLng(faro.coordenadas.coordinates[0], faro.coordenadas.coordinates[1] )"
           :name="faro.nombre"
           >
           
           <l-popup><router-link :to="{ name: 'faro' , params: { faro: faro }}">{{faro.nombre}}</router-link></l-popup>
            <l-icon
    
            :icon-size = iconSize
            :icon-url = "icon"
            >
            
            </l-icon>

            <l-tooltip>{{faro.nombre}}</l-tooltip>
          </l-marker>
        </l-map>
      </div>
      </div>
      <!-- col6 -->
    </div>
    <!-- row -->
    
  </div>
  <!-- container -->
</KeepAlive>
</template>

<script>
// const apiFaros = 'http://localhost:3000/faros'
import axios from 'axios'
import ListaFaros from './ListaFaros.vue'
import MapaFaros from './MapaFaros.vue'
import L from 'leaflet'
import {  LMap, LTileLayer, LMarker, LIcon, LPopup} from 'vue2-leaflet'
import iconoFarito from '../assets/faro.svg'
import {eventBus} from "../main";
import { mapGetters } from "vuex";
export default {
  emits: ['mouse-over-faro', 'mouse-left-faro'],
    name: "ListaAndMapa",
    
    data() {
        return {
            
            //faros: [],
            textInputDisabled: false,
            key:0,
            normalIcon: [25,25],
            largeIcon: [50,50],
            searchQuery: '',
            searchFilter: 'Nombre',
            zoom:5,
            center: L.latLng(-41.94434618654884, -62.15707946259374),
            currentCenter: L.latLng(-41.94434618654884, -62.15707946259374),
            currentZoom: 4,
            url:'https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=166ddc60b6b04768acb4662c580d4a70',
            attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            marker: L.latLng(47.413220, -1.219482),
            icon:iconoFarito,
            iconSize: [30,40]
            
        };
    },
    beforeCreate() {
      this.$store.dispatch('getFaros')
    },
    created() {
        
      
        
        // axios.get("http://localhost:3000/faros")
        //     .then((res) => {
        //     this.faros = res.data

        //     // Se mapea el array y se le agrega una propiedad para el manejar el tamanio del icono
        //     // comienza con un tamanio normal
        //     .map( res => {
        //         res.iconSize = this.normalIcon;
        //         return res
        //     } );
        // });
    },
    components: { ListaFaros, MapaFaros, LMap, LTileLayer, LMarker, LIcon, LPopup },
  
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
      // En estos metodos, cuando el user hace un Over o Left, se modifica la nueva propiedad que fue
      // mapeada.
      mouseOverFaro: function (index) {
        // let faro = this.faros.find(faro.idFaro === index
       
        //this.$store.commit('setIconSizeLarge',index);
        this.$root.$emit('mouse-over-faro',index)
        //   console.log(faro.idFaro);
        //   faro.iconSize = this.largeIcon;
      },
      mouseLeftFaro: function (index) {
        // let faro = this.faros.find(faro.idFaro === index)
        //   faro.iconSize = this.normalIcon;
        // this.faros[index].iconSize = this.normalIcon;
        //this.$store.commit('setIconSizeNormal',index);
        this.$root.$emit('mouse-left-faro',index)
      },

      mouseOver: function (index) {
        this.$emit('mouse-over-faro',index)
        eventBus.$emit('mouse-over-faro',index)
      },
      mouseLeave: function (index) {
        this.$emit('mouse-left-faro',index)
        eventBus.$emit('mouse-left-faro',index)
      },
      filterSearch: function (filter,disableInput) {
        this.searchFilter = filter
        this.textInputDisabled = disableInput
      },

    },
    // Los metodos dentro de computed permiten modificar y manipular valores que unicamente ya existen en el scope
    computed: { 
      forceUpdate: function() {
        console.log('fupdate');
        this.key++
        return true
      },
      
      ...mapGetters(['faros']),

      farosFiltrados : function () {
          
        // Devuelve el array filtrado segun el filtro utilizado
         return this.faros.filter((faro) => {
          let campo = this.searchFilter.toLowerCase();
          let faros;

          // if( campo == 'nombre')
          //   faros = faro.nombre.toLowerCase().match(this.searchQuery.toLowerCase())

          // else if (campo == 'provincia') {
          //   console.log(campo);
          //   faros = faro.provincia.toLowerCase().match(this.searchQuery.toLowerCase())

          // }
          switch (campo) {
            case 'nombre':
              faros = faro.nombre.toLowerCase().match(this.searchQuery.toLowerCase())
              break;

            case 'provincia':
              faros = faro.provincia.toLowerCase().match(this.searchQuery.toLowerCase())
              break;
            
            case 'acceso libre':
              faros = faro.accesible == true
              break;
            case 'acceso restringido':
              faros = faro.accesible == false
              break;
            case 'acceso gratuito':
              faros = faro.accesoPago == false
              break;
            case 'acceso pago':
              faros = faro.accesoPago == true
              break;

            default:
              faros = faro.nombre.toLowerCase().match(this.searchQuery.toLowerCase())
          }


          return faros

         })
         
       },

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .leaflet-container {
    background-color: white ;
  }
  ul {
    background-color: whitesmoke;
  }
  .faros-list {
    overflow-y: scroll;
    height: 95vh;
    background-color: whitesmoke;
    li {
      &:hover {
        background-color: whitesmoke;
      
      }
    }
  }
.row {
  margin-top: 0rem;
}
div.container-fluid {
  
  margin-top: 2rem;
  background-color: whitesmoke;
  padding: 1rem;
}
.map {
  height: 80vh;
}
</style>
