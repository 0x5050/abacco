import invoices from './admin/invoices'
import contacts from './admin/contacts'
import employeeWorkHours from './admin/employeesWorkHours'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    contacts,
    invoices,
    employeeWorkHours
  }
}
