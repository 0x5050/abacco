import Vue from 'vue'
import Router from 'vue-router'
import NavBar from '@/components/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: NavBar
    }
  ]
})
