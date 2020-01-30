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
    },
    listContact: []
  },
  getters: {
    getAllContacts: state => state.listContact
  },
  mutations: {
    setContact: (state, {fieldName, value}) => { state.addContact[fieldName] = value },
    getContacts: (state) => {
      state.listContact = []
      firebase.firestore().collection('contacts').get()
        .then(docsArr => {
          for (let doc of docsArr.docs) {
            console.log(doc.data())
            state.listContact.push(doc.data())
          }
        })
    }
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
