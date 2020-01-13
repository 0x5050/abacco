import Vue from 'vue'
import Router from 'vue-router'
import NavBar from '@/components/Main'
import Information from '@/components/Information'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: NavBar
    },
    {
      path: '/information',
      name: 'Information',
      component: Information
    }
  ]
})
