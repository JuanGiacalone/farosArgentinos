<template>
 <!--  style="width: 18rem;"-->
 <div class="card faros-list" style="width: fit-content"  >
    <ul class="list-group list-group-flush">

       <!--  Se bindean los eventos de html con metodos locales que reciben el indice afectado-->
      <li
          @mouseover="mouseOver(idFaro)" 
          @mouseleave="mouseLeave(idFaro)"
          v-for="faro, idFaro in faros" :key="idFaro"
      
      class="list-group-item"
      >  <router-link to="/faro">{{faro.nombre}}</router-link>  {{faro.coordenadas.coordinates}} {{faro.idFaro}} {{faro.iconSize}}</li>
    </ul>
    
  </div>
  <!-- Card-->
</template>
<script>
import {eventBus} from "../main";
    export default {
    name: 'ListaFaros',
     props:{
       faros: Array,
     },
    methods: {
      // Avisa a la clase padre que hubo un mouse over sobre el faro con index X
      // Emite un evento...
      mouseOver: function (index) {
        this.$emit('mouse-over-faro',index)
        eventBus.$emit('mouse-over-faro',index)
      },
      mouseLeave: function (index) {
        this.$emit('mouse-left-faro',index)
        eventBus.$emit('mouse-left-faro',index)
      }

    },
    
}

</script>
<style lang="scss">
  ul {
    background-color: gray;
  }
  .faros-list {
    overflow-y: scroll;
    height: 95vh;
    background-color: grey;
    li {
      &:hover {
        background-color: darkgrey;
      
      }
    }
  }

</style>