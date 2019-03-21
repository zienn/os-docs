// store.js
import Vue from 'vue'
import Vuex from './zhao'

Vue.use(Vuex)

const commander = {
  state: {
      num: 17
  },
  mutations: {
    fire(state) {
      state.num -= 1
    }
  },
  getters:{
    fireCount(state){
      return (17-state.num) *100 
    },
    totalCount(state,getters,rootState){
      return getters.fireCount + rootState.count*2
    }
  },
  actions: {
      fireAsync({commit}) {
        setTimeout(()=>{
          commit('fire');
        },2000)
      }
  }
}

export default new Vuex.Store({
  modules:{
    commander
  },
  state:{
    count:0
  },
  getters:{
    killCount(state){
      return state.count * 2
    }
  },
  mutations:{
    increment (state,n=1) {
      state.count += n
    }
  },
  actions:{
    incrementAsync(context){
      console.log(context,123)
      setTimeout(()=>{
        context.commit('increment',2)
      },1000)
    }
  }
})
// export default new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     increment (state,n=1) {
//       state.count += n
//     }
//   },
//   actions:{
//     incrementAsync(){
//       setTimeout(()=>{
//         this.commit('increment',2)
//       },1000)
//     }
//   }
// })