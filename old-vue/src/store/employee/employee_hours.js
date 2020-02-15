import { DateTime } from 'luxon'
import firebase from 'firebase'

export default {
  namespaced: true,
  state: {
    add: {
      data: DateTime.local(),
      godzina_rozpoczęcia: DateTime.fromObject({ hour: 7 }),
      godzina_zakończenia: DateTime.fromObject({ hour: 15 }),
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
    setField: (state, { fieldName, value }) => { state.add[fieldName] = value }
  },
  actions: {
    sendData: ({ state, commit }, uid) => {
      const result = {}

      const fullDate = DateTime.fromISO(state.add.data)
      const startHour = DateTime.fromISO(state.add.godzina_rozpoczęcia)
      const endHour = DateTime.fromISO(state.add.godzina_zakończenia)
        .minus({ minutes: state.add.przerwa })

      const workedHours = endHour.diff(startHour, ['minutes', 'hours'])

      result[state.add.data] = {
        data: state.add.data,
        godzina_rozpoczęcia: state.add.godzina_rozpoczęcia,
        godzina_zakończenia: state.add.godzina_zakończenia,
        przerwa: state.add.przerwa,
        suma: `${workedHours.hours}:${workedHours.minutes}`,
        opis: state.add.opis,
        _rowVariant: ''
      }
      firebase.firestore()
        .collection('employee-hours')
        .doc(uid)
        .collection(fullDate.year.toString())
        .doc(fullDate.monthLong)
        .set(result, { merge: true })
        .then(
          commit('alert/setAlert', {
            message: `Zapisano datę ${DateTime.fromISO(state.add.data).toFormat('D')}`,
            variant: 'success',
            duration: 2
          }, { root: true })
        ).catch(err => {
          commit('alert/setAlert', {
            message: `Błąd ${err}`,
            variant: 'danger',
            duration: 2
          }, { root: true })
        })
    }
  }
}
