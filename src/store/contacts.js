import firebase from 'firebase'

export default {
  namespaced: true,
  state: {
    addContact: {
      name: '',
      street: '',
      zip: '',
      city: '',
      nip: null
    }
  },
  getters: {
  },
  mutations: {
    setContact: (state, {fieldName, value}) => { state.addContact[fieldName] = value }
  },
  actions: {
    sendContact: ({commit, state}) => {
      firebase.firestore()
        .collection('contacts')
        .doc(state.addContact.nip)
        .set(state.addContact).then(
          commit('alert/setAlert', {
            message: 'Zapisano',
            variant: 'success',
            duration: 2
          }, {root: true})
        )
    }
  }
}
