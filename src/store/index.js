import Vue from 'vue'
import Vuex from 'vuex'

import invoices from './invoices'
import sidebar from './sidebar'
import alert from './alert'
import employeehours from './employeehours'
import personaldata from './personaldata'
import contacts from './contacts'
import user from './user'
import calendardisplay from './calendardisplay'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    // namespace w store
    invoices,
    sidebar,
    alert,
    employeehours,
    personaldata,
    contacts,
    user,
    calendardisplay
  }
})
