import Vue from 'vue'
import Vuex from 'vuex'

import invoices from './invoices'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    // namespace w store
    invoices
  }
})
