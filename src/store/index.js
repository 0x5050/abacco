import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    sidebar: true
  },
  getters: {
    sidebar: (state) => state.sidebar
  },
  actions: {

  },
  mutations: {
    set_sidebar: (state) => { state.sidebar = !state.sidebar }
  }
})
