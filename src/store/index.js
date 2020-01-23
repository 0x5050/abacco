import Vue from 'vue'
import Vuex from 'vuex'

import invoices from './invoices'
import sidebar from './sidebar'
import alert from './alert'
import employeehours from './employeehours'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    // namespace w store
    invoices,
    sidebar,
    alert,
    employeehours
  }
})
