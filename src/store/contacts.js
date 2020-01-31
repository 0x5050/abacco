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
    getAllContacts: state => state.listContact,
    getContact: state => id => state.listContact.find(contact => contact.nip === id)
  },
  mutations: {
    setContact: (state, {fieldName, value}) => { state.addContact[fieldName] = value },
    getContacts: (state) => {
      state.listContact = []
      firebase.firestore().collection('contacts').get()
        .then(docsArr => {
          docsArr.docs.forEach(doc => {
            state.listContact.push(doc.data())
          })
        })
    }
  },
  // TODO add .catch after then and set Warning Alert
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
    },
    sendEditedContact: ({commit}, payload) => {
      firebase.firestore()
        .collection('contacts')
        .doc(payload.nip)
        .set(payload, {merge: true})
        .then(
          commit('alert/setAlert', {
            message: 'Zapisano',
            variant: 'success',
            duration: 2
          }, {root: true})
        )
    },
    deleteContat: ({commit}, {id}) => {
      console.log(id)
      firebase.firestore()
        .collection('contacts')
        .doc(id)
        .delete()
        .then(
          commit('alert/setAlert', {
            message: 'Usunięto pomyślnie',
            variant: 'success',
            duration: 2
          }, {root: true})
        )
    }
  }
}
