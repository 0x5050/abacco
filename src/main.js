// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/index'
import firebase from 'firebase'
import Vuelidate from 'vuelidate'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-datetime/dist/vue-datetime.css'

let app = ''

const config = {
  apiKey: 'AIzaSyDFen9TsWKSAucNav52E7scL0WYV557pFU',
  authDomain: 'abacco-e9fd3.firebaseapp.com',
  databaseURL: 'https://abacco-e9fd3.firebaseio.com',
  projectId: 'abacco-e9fd3',
  storageBucket: 'abacco-e9fd3.appspot.com',
  messagingSenderId: '482185164298'
}

firebase.initializeApp(config)

Vue.use(Vuelidate)

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>'
    })
  }
})
