export default {
  namespaced: true,
  state: {
    add: {
      date: '',
      start: '',
      stop: '',
      description: ''
    }
  },
  getters: {
    add: state => state.add
  },
  mutations: {
    setField: (state, {fieldName, value}) => { state.add[fieldName] = value }
  },
  actions: {
  }
}
