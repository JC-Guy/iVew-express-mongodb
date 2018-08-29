import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    user: undefined,
    doneOrNot: 1,
    comments:undefined
  },
  mutations: {
    login(state, payload) {
      state.user = payload
    },
    logout(state) {
      state.user = undefined
    },
    register(state, payload) {
      state.user = payload
    },
    submitt(state,payload){
      state.comments=payload
    }
  },
  actions: {
    login(context, payload) {
      context.commit('login', payload)
    },
    logout(context) {
      context.commit('logout')
    },
    register(context, payload) {
      context.commit('register', payload)
    },
    submitt(context,payload){
      context.commit('submitt',payload)
    }
  }

})

export default store
