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
    }
  }
}
