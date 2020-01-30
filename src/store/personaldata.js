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
  },
  actions: {
  }
}
