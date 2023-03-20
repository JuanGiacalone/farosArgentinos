
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
  state: {  
    faros: [],
    comentarios: [],
    farosTop5: []  
  },
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
    // setIconSizeLarge (state,idFaro) {
      
    //   let faro = state.faros.find( faro => faro.idFaro == idFaro )
    //   faro.iconSize = [50,50]
    //   console.log(faro.iconSize);
    //   console.log('seticonsizeLarge'+ state + idFaro);
    // },
    // setIconSizeNormal (state,idFaro) {
      
    //   let faro = state.faros.find( faro => faro.idFaro == idFaro )
    //   console.log(faro.iconSize);
    //   faro.iconSize = [25,25]
    //   console.log(faro);
    //   console.log('seticonsizeNormal'+ state + idFaro);
    // }
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


// export const useFaroStore = defineStore("faro", {
//     state: () => ({
//         faros: [],
//     }),
//     getters: {
//       getFaros(state){
//           return state.faros
//         }
//     },
//     actions: {
//       async fetchFaros() {
//         try {
//           const data = await axios.get('http://localhost:3000/faros')
//             // console.log(process.env.FAROS_ENDPOINT);
//             this.faros = data.data
//           }
//           catch (error) {
//             alert(error)
//             console.log(error)
//         }
//       }
//     },
// })