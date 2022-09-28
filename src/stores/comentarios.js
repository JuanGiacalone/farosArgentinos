//stores/users.js
// Import axios to make HTTP requests
import Vue from 'vue'
import axios from "axios"
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    comentarios: [] 
  },
  mutations: {
    setComentarios (state, comentarios) {
      state.comentarios = comentarios
      console.log('setComentarios' + state.comentarios);

    },
  },
  actions: {
    async getComentarios (context, idFaro) {
      const  res  = await axios.get('http://localhost:3000/comentarios/'+ idFaro )
      console.log(res);
      context.commit('setComentarios', res.data)

    },

    async putComentario (context, payload) {

    }
  },
  getters: {
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