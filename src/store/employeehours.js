import { DateTime } from 'luxon'

export default {
  namespaced: true,
  state: {
    add: {
      date: DateTime.local(),
      start: DateTime.fromObject({hour: 7}),
      stop: DateTime.fromObject({hour: 15}),
      description: '',
      verified: false
    }
  },
  getters: {
    addDate: state => state.add
  },
  mutations: {
    setField: (state, {fieldName, value}) => { state.add[fieldName] = value }
  },
  actions: {
  }
}
