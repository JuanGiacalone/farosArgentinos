//stores/users.js
// Import axios to make HTTP requests
import Vue from 'vue'
import axios from "axios"
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    faros: [],
    comentarios: []  
  },
  mutations: {
    setFaros (state, faros) {
      state.faros = faros
      console.log('setFaros' + state.faros);

    },
    setComentarios (state, comentarios) {
      state.comentarios = comentarios
      console.log('setComentarios' + state.comentarios);

    },
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
      const  res  = await axios.get('http://localhost:3000/faros')
      console.log(res);
      context.commit('setFaros', res.data)

    },
    async getComentarios (context, idFaro) {
      const  res  = await axios.get('http://localhost:3000/comentarios/'+ idFaro )
      console.log(res);
      context.commit('setComentarios', res.data)

    },
  },
  getters: {
    faros: state => {
      return state.faros
    },
    comentarios: state => {
      return state.comentarios
    }
  }
})



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