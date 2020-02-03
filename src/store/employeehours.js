import { DateTime } from 'luxon'

export default {
  namespaced: true,
  state: {
    add: {
      data: DateTime.local(),
      godzina_rozpoczęcia: DateTime.fromObject({hour: 7}),
      godzina_zakończenia: DateTime.fromObject({hour: 15}),
      przerwa: 45,
      suma: '',
      opis: '',
      _rowVariant: ''
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
