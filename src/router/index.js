import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/pages/Main'
import Login from '@/components/pages/Login'
import Admin from '@/components/pages/Admin'
import Employee from '@/components/pages/Worker'

import UserMenagment from '@/components/pages/admin_page/UserMenagment'

// import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      component: Main
    },
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/employee',
      name: 'Employee',
      component: Employee,
      meta: {
        requiresAuth: true,
        guest: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAuth: true,
        admin: true
      },
      children: [
        {
          path: 'user-menagment',
          component: UserMenagment
        }
      ]
    }
  ]
})

// Refacto this shiet for child routes
//
// router.beforeEach((to, from, next) => {
//   const currentPath = router.currentRoute.path

//   firebase.auth().onAuthStateChanged(userAuth => {
//     if (userAuth) {
//       firebase.auth().currentUser.getIdTokenResult()
//         .then(function ({claims}) {
//           if (claims.employee && currentPath !== '/') {
//             if (to.path !== '/employee') {
//               return next({path: '/employee'})
//             }
//           } else if (claims.admin && currentPath !== '/') {
//             if (to.path !== '/admin') {
//               return next({path: '/admin'})
//             }
//           } else if (!claims.admin && !claims.employee) {
//             alert('Błąd z kontem')
//             firebase.auth().signOut()
//             return next({path: '/login'})
//           }
//         })
//     } else {
//       const currentUser = firebase.auth().currentUser
//       const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

//       if (requiresAuth && !currentUser && currentPath !== '/') next('login')
//     }
//   })
//   next()
// })

export default router
