import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/pages/Main'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      name: 'Main',
      component: Main
    },
    {
      path: '/',
      name: 'Main',
      component: Main
    }
  ]
})

export default router
