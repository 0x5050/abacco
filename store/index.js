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

  checkVuexStore (ctx) {
    if (this.$fireAuth === null) {
      throw new Error('Vuex Store example not working - this.$fireAuth cannot be accessed.')
    }
  }
}
