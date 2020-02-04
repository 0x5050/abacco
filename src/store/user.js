import firebase from 'firebase'

export default {
  namespaced: true,
  state: {
    user: {
      user_id: '',
      role: '',
      email: ''
    }
  },
  getters: {
    getUserData: state => state.user
  },
  mutations: {
    setUser: (state, {fieldName, value}) => { state.user[fieldName] = value },
    clerUserData: (state) => {
      state.user = {
        user_id: '',
        role: '',
        email: ''
      }
    }

  },
  actions: {
    getUserData: ({commit}) => {
      const _userDataFields = ['role', 'email', 'user_id']
      firebase.auth().onAuthStateChanged(userAuth => {
        if (userAuth) {
          firebase.auth().currentUser.getIdTokenResult()
            .then(({claims}) => {
              _userDataFields.forEach(async field => {
                await commit('setUser', {
                  fieldName: field,
                  value: claims[field]
                })
              })
            })
        }
      })
    },
    userLogin: ({dispatch}, {email, password}) => {
      firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(dispatch('getUserData'))
    },
    userLogOut: ({commit}) => {
      firebase.auth().signOut()
        .then(commit('clerUserData'))
    },
    userRegister: ({commit}, {email, password}) => {
      firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          commit('alert/setAlert', {
            message: `Utworzono konto ${email}`,
            variant: 'success',
            duration: 2
          }, {root: true}))
    }
  }
}
