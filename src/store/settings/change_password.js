import firebase from 'firebase'

export default {
  namespaced: true,
  state: {
    settings: {
      change_password: {
        old_password: '',
        password: '',
        retyped_password: ''
      }
    }
  },
  getters: {
  },
  mutations: {
    setPasswordField: (state, {fieldName, value}) => { state.settings.change_password[fieldName] = value }
  },
  actions: {
    changePassword: ({state, rootState}) => {
      const user = firebase.auth().currentUser
      const credential = firebase.auth.EmailAuthProvider.credential(
        rootState.user.user.email,
        state.settings.change_password.old_password
      )

      user.reauthenticateWithCredential(credential).then(() => {
        user.updatePassword(state.settings.change_password.password)
      })
    }
  }
}
