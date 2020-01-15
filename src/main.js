// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/index'
import firebase from 'firebase'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// let app = ''

const config = {
  apiKey: 'AIzaSyDFen9TsWKSAucNav52E7scL0WYV557pFU',
  authDomain: 'abacco-e9fd3.firebaseapp.com',
  databaseURL: 'https://abacco-e9fd3.firebaseio.com',
  projectID: 'abacco-e9fd3',
  storageBucket: 'abacco-e9fd3.appspot.com',
  messagingSenderId: '482185164298'
}

firebase.initializeApp(config)

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
