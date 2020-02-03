import { DateTime } from 'luxon'
import firebase from 'firebase'

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
    sendData: ({state, commit}, uid) => {
      const fullDate = DateTime.fromISO(state.add.data)
      const result = {}

      result[state.add.data] = {
        data: DateTime.fromISO(state.add.data).toFormat('D'),
        godzina_rozpoczęcia: DateTime.fromISO(state.add.godzina_rozpoczęcia).toFormat('T'),
        godzina_zakończenia: DateTime.fromISO(state.add.godzina_zakończenia).toFormat('T'),
        przerwa: state.add.przerwa,
        opis: state.add.opis,
        _rowVariant: ''
      }
      firebase.firestore()
        .collection('employee-hours')
        .doc(uid)
        .collection(fullDate.year.toString())
        .doc(fullDate.monthLong)
        .set(result, {merge: true})
        .then(
          commit('alert/setAlert', {
            message: `Zapisano datę ${DateTime.fromISO(state.add.data).toFormat('D')}`,
            variant: 'success',
            duration: 2
          }, { root: true })
        ).catch(err => {
          commit('alert/setAlert', {
            message: err,
            variant: 'success',
            duration: 2
          }, { root: true })
        })
    }
  }
}
