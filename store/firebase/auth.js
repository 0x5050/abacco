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
  nuxtServerInit ({ commit }, ctx) {
    if (this.$fireAuth === null) {
      throw new Error('this.$fireAuth cannot be accessed.')
    }

    if (ctx.$fireAuth === null || ctx.app.$fireAuth === null) {
      throw new Error('ctx.$fireAuth cannot be accessed.')
    }
    /** Get the VERIFIED authUser from the server */

    const ssrVerifiedAuthUser = ctx.res.verifiedFireAuthUser
    const ssrVerifiedAuthUserClaims = ctx.res.verifiedFireAuthUserClaims

    if (ssrVerifiedAuthUserClaims) {
      commit('SET_AUTH_USER', {
        authUser: ssrVerifiedAuthUser
      })
    }
  },

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

  checkVuexStore (ctx) {
    if (this.$fireAuth === null) {
      throw new Error('Vuex Store example not working - this.$fireAuth cannot be accessed.')
    }
  },

  async logoutUser ({ commit, dispatch }) {
    try {
      await this.$fireAuth.signOut()
    } finally {
      commit('RESET_STORE')
    }
  }
}
