export const state = () => ({
  authUser: null
})

export const getters = {
  isLoggedIn: (state) => {
    try {
      return state.authUser.id !== null
    } catch {
      return false
    }
  },
  getAuthUser: state => state.authUser
}

export const mutations = {
  RESET_STORE: (state) => {
    state.authUser = null
  },

  SET_AUTH_USER: (state, { authUser }) => {
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email
    }
  }
}

export const actions = {

  handleSuccessfulAuthentication ({ commit }, { authUser, claims }) {
    // Install servicerWorker if supported on sign-in/sign-up page.
    if (process.browser && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-auth-sw.js', { scope: '/' })
    }
    commit('SET_AUTH_USER', { authUser })
  },

  handleError ({ commit }) {
    throw new Error('Error auth')
  },

  async logoutUser ({ commit, dispatch }) {
    try {
      await this.$fireAuth.signOut()
    } finally {
      commit('RESET_STORE')
    }
  }
}
