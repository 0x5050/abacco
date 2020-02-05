import firebase from 'firebase'

export default {
  namespaced: true,
  state: {
    selectedUser: '',
    user: 'uid',
    months: [],
    year: new Date().getFullYear().toString(),
    userList: []
  },
  getters: {
    selectedUser: state => state.user,
    getUserList: state => state.userList,
    getUserMonths: state => state.months
  },
  mutations: {
    addMonth: (state, payload) => { state.months.push(payload) },
    clearMonths: (state) => { state.months = [] },
    addUser: (state, payload) => { state.userList.push(payload) },
    setUser: (state, payload) => { state.user = payload }
  },
  actions: {
    fetchUserMonths: ({commit, state, rootState}) => {
      commit('clearMonths')
      firebase.firestore()
        .collection('employee-hours')
        .doc(state.user)
        .collection(state.year)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            commit('addMonth', {[doc.id]: doc.data()})
          })
        })
    },
    setDayStatus: ({state}, {item, month, value}) => {
      const date = item.data
      const obj = {}
      obj[dateConverter(date)] = item
      obj[dateConverter(date)]._rowVariant = value

      firebase.firestore()
        .collection('employee-hours')
        .doc(state.user)
        .collection(state.year.toString())
        .doc(Object.keys(month).toString())
        .set(obj, {merge: true})
    },
    mapUsers: ({commit, state, rootState}) => {
      firebase.firestore().collection('roles').get()
        .then(querySnapshot => {
          querySnapshot.docs.map(doc => {
            commit('addUser', {
              value: doc.id,
              text: doc.data().email
            })
          })
        })
    }
  }
}

const dateConverter = (date) => {
  const _number = date.split('.')
  const _date = new Date(parseInt(_number[2]), parseInt(_number[1]) - 1, parseInt(_number[0]))
  _date.setHours(1)
  return _date.toISOString()
}
