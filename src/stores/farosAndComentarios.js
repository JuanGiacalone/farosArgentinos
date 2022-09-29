
// Import axios to make HTTP requests
import Vue from 'vue'
import axios from "axios"
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
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
    pushComentario(state,comentario) {
      try {
        state.faros.push(comentario)
      } catch (error) {
        console.log(error);
      }


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
        const  res  = await axios.get('http://localhost:3000/faros')

        context.commit('setFaros', res.data)
      } catch (error) {
        console.log('getFaros failed' + error);
      }


    },
    async getComentarios (context, idFaro) {
      try {
        const  res  = await axios.get('http://localhost:3000/comentarios/'+ idFaro )

        context.commit('setComentarios', res.data)
      } catch (error) {
        console.log('getComentarios failed' + error);
      }
    },
    async putComentario(context, data) {

      try {

        const com = await axios.put('http://localhost:3000/comentarios/'+data.comentarios.idFaro, data )

        context.commit('pushComentario', data)

      } catch (error) {
        console.log('putComentario failed' + error);
      }
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