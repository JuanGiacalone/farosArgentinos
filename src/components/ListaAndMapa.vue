<template>
  <div class="container-fluid">

    <div class="row">
      
      <div class="col-3 ">
        <div class="input-group input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Buscar</span>
                      <!-- Se bindea el input a una variable  -->
          <input type="text" v-model="searchNombre" placeholder="Nombre" class="form-control" 
          aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
        </div>
          <!-- Se bindean nuevamente los eventos externos a metodos locales -->
          <!-- Se envian los faros Filtrados a la clase hija que se encarga de mostrarlos -->
       <ListaFaros 
       
       @mouse-over-faro = "mouseOverFaro"
       @mouse-left-faro = "mouseLeftFaro"
       :faros = "farosFiltrados"/>

      </div>
      <!-- col6 -->
      <div class="col-7">
        <!-- Se pasa el Array faros como prop -->
       <!-- <MapaFaros :faros = "faros"/>  -->
      <MapaFaros :faros = "farosFiltrados"/>

      </div>
      <!-- col6 -->
    </div>
    <!-- row -->
    
  </div>
  <!-- container -->
</template>

<script>
// const apiFaros = 'http://localhost:3000/faros'
import axios from 'axios'
import ListaFaros from './ListaFaros.vue'
import MapaFaros from './MapaFaros.vue'
import {mapState} from 'vuex'
import { mapGetters } from "vuex";
export default {
  emits: ['mouse-over-faro', 'mouse-left-faro'],
    name: "ListaAndMapa",
    
    data() {
        return {
            
            //faros: [],
            normalIcon: [25,25],
            largeIcon: [50,50],
            searchNombre: ''
        };
    },
    created() {

        
       this.$store.dispatch('getFaros')
        
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
    components: { ListaFaros, MapaFaros },
  
    methods: {

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
      }
    },
    // Los metodos dentro de computed permiten modificar y manipular valores que unicamente ya existen en el scope
    computed: { 
      
      ...mapGetters(['faros']),
      
      farosFiltrados : function () {

        // Devuelve el array filtrado segun el filtro utilizado
         return this.faros.filter((faro) => {
          
          return faro.nombre.toLowerCase().match(this.searchNombre.toLowerCase())
         
         })
       }
      }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
div {
  
  background-color: whitesmoke;
  padding: 1rem;
}
.container-fluid {
  margin-top: 3rem;
}
</style>
