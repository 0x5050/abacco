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

import userStore from '@/store/user.js'

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
      ],
      beforeEnter: (to, from, next) => {
        const userRole = userStore.state.user.role
        if (userRole === 'employee') return next()
        else {
          return next({path: '/login'})
        }
      }
    },
    {
      path: '/admin',
      name: 'Panel',
      component: Admin,
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
      ],
      beforeEnter: (to, from, next) => {
        const userRole = userStore.state.user.role
        if (userRole === 'admin') return next()
        else {
          return next({path: '/login'})
        }
      }
    }
  ]
})

export default router
