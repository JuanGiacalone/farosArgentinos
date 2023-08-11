<template>
  <KeepAlive>


  <div class="container-fluid">

    <div class="row">
      
      <div class="col-3 ">

        <div class="input-group input-group mb-3" >
          <div>

            <!-- searchFilter va a contener el nombre del filtro que se este usando, 
            modificando asi el texto del boton que permite el dropdown -->
            <b-dropdown id="dropdown-1" :text="searchFilter"  class="m-2" >
              <!-- filterSearch, toma el filtro a usar y si desabilita el input text o no (false lo deja habilitado)-->
              <b-dropdown-item  @click="filterSearch('Nombre',false)" > Nombre</b-dropdown-item>
              <b-dropdown-item  @click="filterSearch('Provincia',false)">Provincia</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="filterSearch('Acceso Libre',true)">Acceso Libre</b-dropdown-item>
              <b-dropdown-item @click="filterSearch('Acceso Restringido',true)">Acceso Restringido</b-dropdown-item>
              <b-dropdown-item @click="filterSearch('Acceso Gratuito',true)">Acceso Gratuito</b-dropdown-item>
              <b-dropdown-item @click="filterSearch('Acceso Pago',true)">Acceso Pago</b-dropdown-item>
            </b-dropdown>
          </div>
                      <!-- Se bindea el input que se seleccione a la variable searchQuery  -->
                      
          <input autofocus type="text" v-model="searchQuery" placeholder="Buscar..." class="form-control"  
          aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" :disabled="textInputDisabled" id="filterTextInput" >
        </div>
                                                    <!-- textInputDisabled (booleano) hace que se deshabilite el text input en caso de que
                                                    el filtro sea de tipo Acceso... -->
        <!-- input group -->

        <div class="card faros-list" style="width: auto; padding: 0.4rem; text-align: center; overflow-y: scroll; height: 73vh;"  >

            <ul class="list-group list-group-flush" id="listFaros">
              
                        <!-- Se muestra lo que se encuentra en la lista de farosFiltrados, si no se filtra,
                        contiene a todos los faros...  -->
              <li  
                  v-for="faro in farosFiltrados" :key="faro.idFaro"
              class="list-group-item"
              >   <router-link :to="{ name: 'faro' , params: { faro: faro }}">{{faro.nombre}}</router-link> </li>
            </ul>
        </div>
        <!-- card faros list 3 -->
      </div>
      <!-- col 3 -->

      <div class="col-7">

          <div class="row map">
            <div class="card" style="padding: 0.4rem; overflow-y: auto;" id="divMapaFaros">

              <!-- Componente externo LeafletVue, comienza configurando el zoom y las coordenas de inicio -->
              <l-map
                :zoom="zoom" 
                :center="center">

                <!-- Seteo de propiedades de la cartografia, url y creditos -->
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>

                <!-- Se genera un marcador por cada faro en farosFiltrados -->
                <l-marker
              
                v-for="faro in farosFiltrados" :key="faro.idFaro"
                :lat-lng="latLng(faro.coordenadas.coordinates[0], faro.coordenadas.coordinates[1] )"
                :name="faro.nombre"
                >
                <!-- Para cada marcador se configura un popUp con las props del faro  -->
                <l-popup><router-link :to="{ name: 'faro' , params: { faro: faro }}">{{faro.nombre}}</router-link></l-popup>
                
                <!-- Para cada faro un icono con dichas variables -->
                <l-icon
                  :icon-size = iconSize
                  :icon-url = "icon"
                  ></l-icon>

                  <!-- Para cada marcador, un tooltip con el nombre -->
                  <l-tooltip>{{faro.nombre}}</l-tooltip>

                </l-marker>

              </l-map>
            </div>
            <!-- card faros list -->
            
          </div>
        <!-- row map -->

      </div>
    <!-- col 7 -->
    <div class="col-2">

      <div class="card faros-list" style="width: auto; height: fit-content; overflow-y: auto; text-align: center; padding: 0.4rem;"  >
        <h6    style="color:black; text-align: center;">Top 5 Faros</h6>
        <ul class="list-group list-group-flush">
    
           <!--  Se muestra la lista con el top5 faros provenientes del store, como todas las query-->
          <li
              v-for="faro in farosTop5" :key="faro.idFaro"
          class="list-group-item"
          >

          <!-- Para cada uno se arma un router link que redirige a la vista con los datos de faro, que van como parametro -->    
          <router-link :to="{ name: 'faro' , params: { faro: faro } }">{{faro.nombre}}</router-link>

        </li>
        </ul>
      </div>
      <!-- card faros list --> 

    </div>
    <!-- col-2 --> 

  </div>
    <!-- row -->   

</div>
<!-- container -->

</KeepAlive>
</template>

<script>
  

import L from 'leaflet'
import {  LMap, LTileLayer, LMarker, LIcon, LPopup} from 'vue2-leaflet'
import iconoFarito from '../assets/faro.svg'
import { mapGetters } from "vuex";
export default {

    name: "ListaAndMapa",
    components: { LMap, LTileLayer, LMarker, LIcon, LPopup },
    
    data() {
        return {
            
            textInputDisabled: false,
            key:0,
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
            iconSize: [30,40],
            
        };
    },
    // Metodo que realiza las llamadas elementales antes que se cree la vista
    beforeCreate() {
      this.$store.dispatch('getFaros')
      this.$store.dispatch('getFarosTop5')
      
    },

    methods: {
      // Metodo q devulve un objeto de tipo L (LeafletVue) con las lat y lng enviadas
        latLng: function (lat, lng) {
        return L.latLng(lat,lng)
      },

      // Maneja el estado del input y el filtro que se encuentra seleccionado.
      filterSearch: function (filter,disableInput) {
        this.searchFilter = filter
        this.textInputDisabled = disableInput
      },

    },
    // Los metodos dentro de computed permiten modificar y manipular valores que unicamente ya existen en el scope
    computed: { 

      // mapeo las variables faros con los datos obtenidos de sus gets
      ...mapGetters(['faros']),
      ...mapGetters(['farosTop5']),
      
      farosFiltrados : function () {
        // Devuelve el array filtrado segun el filtro utilizado
        // El this.faros hace referencia a la lista con todos los faros que obtuvo el geter invocado en ...mapGetters
      
         return this.faros.filter((faro) => {
          let campo = this.searchFilter.toLowerCase();
          let faros;

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

          /// Una vez terminado el filtrado devulve los faros filtrados
          return faros

         })
         
       },

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@media screen and (resolution: 150dpi) {
  #divMapaFaros {
    height: 88.5vh;
  }
  .container-fluid{
    padding-bottom: 0;
  }

}
@media (min-width: 1920px) and (max-width: 1080px)  {
  #divMapaFaros {
    height: 64vh
  }
}
#divMapaFaros {
  height: 80vh;
}
  .leaflet-container {
    background-color: white ;
  }
  ul {
    background-color: whitesmoke;
  }
  .faros-list {
    overflow-y: scroll;
    height: fit-content;
    background-color: whitesmoke;
    li {
      &:hover {
        background-color: grey;
      
      }
    }
  }
.row {
  margin-top: 0rem;
}
div.container-fluid {
  
  background-color: whitesmoke;
  padding: 1rem;
}
.map {
  height: 80vh;
}
</style>
