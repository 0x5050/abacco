import Vue from 'vue'
import Vuex from 'vuex'

import invoices from './invoices'
import sidebar from './sidebar'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    // namespace w store
    invoices,
    sidebar
  }
})
