import Vue from 'vue'
import Vuex from 'vuex'

import sidebar from './sidebar'
import alert from './alert'
import user from './user'

import admin from './admin'
import employee from './employee'
import settings from './settings'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    // namespace w store
    sidebar,
    alert,
    user,
    settings,
    employee,
    admin
  }
})
