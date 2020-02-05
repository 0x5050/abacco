import firebase from 'firebase'
import { DateTime } from 'luxon'

export default {
  namespaced: true,
  state: {
    calendar: {
      months: []
    }
  },
  getters: {
    getCalendar: state => state.calendar
  },
  mutations: {
    pushMonth: (state, payload) => {
      state.calendar.months.push(payload)
    },
    clearMonths: (state) => { state.calendar.months = [] }
  },
  actions: {
    fetchData: ({commit, rootState}) => {
      const previousMonth = DateTime.local().minus({month: 1}).monthLong
      const actualMonth = DateTime.local().monthLong
      const _monthsArr = [ actualMonth, previousMonth ]
      commit('clearMonths')
      _monthsArr.forEach(month => {
        firebase.firestore()
          .collection('employee-hours')
          .doc(rootState.user.user.user_id)
          .collection(DateTime.local().year.toString())
          .doc(month)
          .get()
          .then(doc => {
            commit('pushMonth', {[doc.id]: doc.data()})
          })
      })
    }
  }
}
