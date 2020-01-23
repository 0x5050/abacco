export default {
  namespaced: true,
  state: {
    alert: {
      message: '',
      variant: 'info',
      duration: 0
    }
  },
  getters: {
    getAlert: state => state.alert
  },
  mutations: {
    setAlert: (state, payload) => {
      state.alert = payload
      setTimeout(() => {
        state.alert = {
          message: '',
          variant: '',
          duration: 0
        }
      }, 1000)
    }
  },
  actions: {
  }
}
