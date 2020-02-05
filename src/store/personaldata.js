import firebase from 'firebase'

export default {
  namespaced: true,
  state: {
    presonalData: {
      name: '',
      surname: '',
      phone: null
    }
  },
  getters: {
    getPersonalData: state => state.presonalData
  },
  mutations: {
    setPersonalData: (state, {fieldName, value}) => { state.presonalData[fieldName] = value },
    savePersonalData: (state, uid) => {
      firebase.firestore()
        .collection('users')
        .doc(uid)
        .set(state.presonalData, {merge: true})
    }
  },
  actions: {
    sendPersonalData: ({commit, root}, uid) => {
      commit('savePersonalData', uid)
      commit('alert/setAlert', {
        message: 'Zapisano',
        variant: 'success',
        duration: 2
      }, { root: true })
    },
    fetchData: ({commit, rootState}) => {
      firebase.firestore()
        .collection('users')
        .doc(rootState.user.user.user_id)
        .get()
        .then(documentSnapshot => {
          const data = documentSnapshot.data()
          const fieldsNames = Object.keys(documentSnapshot.data())
          for (const fieldName of fieldsNames) {
            commit('setPersonalData', {fieldName: fieldName, value: data[fieldName]})
          }
        })
    }
  }
}
