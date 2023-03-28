
// Import axios to make HTTP requests
import Vue from 'vue'
import axios from "axios"
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

const ENDPOINT = import.meta.env.VITE_FAROSARGENTINOS_ENDPOINT;
const ENDPOINT_FAROS = ENDPOINT + 'faros/'
const ENDPOINT_COMENTARIOS = ENDPOINT + 'comentarios/'

Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
<<<<<<< HEAD

  // Se definen las listas a manejar
  state: {
=======
  state: {  
>>>>>>> c3d0e64375f05836db17a5e6c44903e20386e51d
    faros: [],
    comentarios: [],
    farosTop5: []  
  },
  // Se definen los cambios que pueden tener los estados
  mutations: {
    setFaros (state, faros) {
      state.faros = faros
      console.log('setFaros' + state.faros);

    },
    setFarosTop5 (state, faros) {
      state.farosTop5 = faros
      console.log('setFarosTop5' + state.farosTop5);

    },
    setComentarios (state, comentarios) {
      state.comentarios = comentarios
      console.log('setComentarios' + state.comentarios);

    },
    
    getNuevosComentarios() {
      return state.comentarios
    }

  },
  actions: {
    async getFaros (context) {
      try {
        const  res  = await axios.get( ENDPOINT_FAROS )

        context.commit('setFaros', res.data)
      } catch (error) {
        console.log('getFaros failed' + error);
      }
    },
    async getFarosTop5 (context) {
      try {
          const res = await axios.get( ENDPOINT_FAROS + 'top')
        context.commit('setFarosTop5', res.data)

      } catch (error) {
        console.log('get FarosTop5 failed' + error);
      }
    },
    async getComentarios (context, idFaro) {
      try {
          const  res  = await axios.get( ENDPOINT_COMENTARIOS + idFaro )

        context.commit('setComentarios', res.data)
      } catch (error) {
        console.log('getComentarios failed' + error);
      }
    },
    async putComentario(context, data) {

      try {

          await axios.put( ENDPOINT_COMENTARIOS + data.comentarios.idFaro, data )

      } catch (error) {
        console.log('putComentario failed ' + error);
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
    }
  },
  plugins: [createPersistedState()]
})

export default store
