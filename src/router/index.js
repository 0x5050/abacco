import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/pages/Main'
import Login from '@/components/pages/Login'
import Admin from '@/components/pages/Admin'
import Employee from '@/components/pages/Employee'

import Settings from '@/components/pages/Settings'

import UserMenagment from '@/components/pages/admin_page/UserMenagment'
import PAEmployeeHours from '@/components/pages/admin_page/EmployeeHours'
import Invoices from '@/components/pages/admin_page/Invoices'
import PAContacts from '@/components/pages/admin_page/Contacts'

import PECalendarDisplay from '@/components/pages/employee_page/CalendarDisplay'
import PEWorkHours from '@/components/pages/employee_page/WorkHours'

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
      },
      children: [
        {
          name: 'Kalendarz',
          path: 'calendar',
          component: PECalendarDisplay
        },
        {
          name: 'Praca',
          path: 'work',
          component: PEWorkHours
        },
        {
          name: 'Ustawienia',
          path: 'settings',
          component: Settings
        }
      ]
    },
    {
      path: '/admin',
      name: 'Panel',
      component: Admin,
      meta: {
        requiresAuth: true,
        admin: true
      },
      children: [
        {
          name: 'Użytkownicy',
          path: 'user-menagment',
          component: UserMenagment
        },
        {
          name: 'Faktury',
          path: 'invoices',
          component: Invoices
        },
        {
          name: 'Godziny',
          path: 'hours',
          component: PAEmployeeHours
        },
        {
          name: 'Ustawienia',
          path: 'settings',
          component: Settings
        },
        {
          name: 'Kontrahenci',
          path: 'contacts',
          component: PAContacts
        }
      ]
    }
  ]
})

// TODO Refacto this (store info handling)
// router.beforeEach((to, from, next) => {
//   const currentPath = router.currentRoute.path

//   firebase.auth().onAuthStateChanged(userAuth => {
//     if (userAuth) {
//       firebase.auth().currentUser.getIdTokenResult()
//         .then(({claims}) => {
//           if (claims.employee && currentPath !== '/') {
//             if (to.path.slice(0, 9) !== '/employee') {
//               return next({path: '/employee'})
//             }
//           } else if (claims.admin && currentPath !== '/') {
//             if (to.path.slice(0, 6) !== '/admin') {
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
