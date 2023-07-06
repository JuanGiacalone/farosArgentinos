
// Import axios to make HTTP requests
import Vue from 'vue'
import axios from "axios"
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

const ENDPOINT = import.meta.env.VITE_FAROSARGENTINOS_ENDPOINT;
const ENDPOINT_FAROS = ENDPOINT + 'faros/'
const ENDPOINT_COMENTARIOS = ENDPOINT + 'comentarios/'
const ENDPOINT_PUBLICIDADES = ENDPOINT + 'publicidades/'

Vue.use(Vuex)


const store = new Vuex.Store({
  namespaced: true,

  // Se definen las listas a manejar
  state: {
    faros: [],
    comentarios: [],
    farosTop5: [],
    publicidades: []  
  },
  // Se definen los cambios que pueden tener los estados
  mutations: {
    setFaros (state, faros) {
      state.faros = faros
      console.log('setFaros');
    },
    setFarosTop5 (state, faros) {
      state.farosTop5 = faros
      console.log('setFarosTop5');
    },
    setComentarios (state, comentarios) {
      state.comentarios = comentarios
      console.log('setComentarios');
    },
    setPublicidades (state, publicidades) {
      state.publicidades = publicidades
      console.log('setPublicidades');
    },
    
    getNuevosComentarios() {
      return state.comentarios
    }

  },
  actions: {
    
    async getPublicidades (context, idFaro) {
      try {
          const  res  = await axios.get( ENDPOINT_PUBLICIDADES + idFaro )
          
        context.commit('setPublicidades', res.data)
      } catch (error) {
        console.log('GET /PUBLICIDADES falló: VERIFICAR ESTADO DE LA API ' + error);
      }
    },
    async getFaros (context) {
      try {
        const  res  = await axios.get( ENDPOINT_FAROS )

        context.commit('setFaros', res.data)
      } catch (error) {
        console.log('GET /FAROS falló : VERIFICAR ESTADO DE LA API ' + error);
      }
    },
    async getFarosTop5 (context) {
      try {
          const res = await axios.get( ENDPOINT_FAROS + 'top')
        context.commit('setFarosTop5', res.data)

      } catch (error) {
        console.log('GET /FAROS/top falló: VERIFICAR ESTADO DE LA API ' + error);
      }
    },
    async getComentarios (context, idFaro) {
      try {
          const  res  = await axios.get( ENDPOINT_COMENTARIOS + idFaro )
          
        context.commit('setComentarios', res.data)
      } catch (error) {
        console.log('GET /COMENTARIOS falló VERIFICAR ESTADO DE LA API ' + error);
      }
    },


    async putComentario(context, data) {

      try {

          await axios.put( ENDPOINT_COMENTARIOS + data.comentarios.idFaro, data )

      } catch (error) {
        console.log('PUT /COMENTARIO no retornó 200 OK ' + error);
      }
    },
    async putImpresion(context,idFaro) {
      try {

        await axios.put( ENDPOINT_FAROS + idFaro)

      } catch (error) {
        console.log('putImpresion failed ' + error);
      }
    } 
  },

  // Definicion de los getters disponibles
  getters: {
    faros: state => {
      return state.faros
    },
    comentarios: state => {
      return state.comentarios
    },
    farosTop5: state => {
      return state.farosTop5
    },
    publicidades: state => {
      return state.publicidades
    }
  },
  plugins: [createPersistedState()]
})

export default store
