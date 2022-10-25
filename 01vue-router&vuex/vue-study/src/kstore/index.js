import Vue from 'vue'
import Vuex from './kvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    add(state) {
      // state从哪来？
      state.counter++
    }
  },
  actions: {
    add({ commit }) {
      // 参数是什么，哪来的？
      setTimeout(() => {
        commit('add')
      }, 1000)
    }
  },
  getters: {
    doubleCounter(state) {
      return state.counter * 2
    }
  }
})
