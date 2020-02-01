import firebase from 'firebase'
import { DateTime } from 'luxon'

export default {
  namespaced: true,
  state: {
    addInvoice: {
      sender: {
        name: 'PPHU ABACCO',
        street: 'Aleja Grunwaldzka 238 d',
        zip: '80-266',
        city: 'Gdańsk'
      },
      recipient: {},
      date: DateTime.local().toString(),
      worth: 0,
      number: null,
      items_count: 1,
      items: [
        {
          name: '',
          count: 1,
          price: 0,
          vat_rate: 23
        }
      ]
    },
    invoices: []
  },
  getters: {
    invoice: state => state.addInvoice,
    invoice_date: state => DateTime.fromISO(state.date).toFormat('D'),
    invoices: state => state.invoices
  },
  mutations: {
    set_invoice_value: (state, {fieldName, value}) => { state.addInvoice[fieldName] = value },
    set_invoice_item_value: (state, {fieldName, index, value}) => {
      state.addInvoice.items[index - 1][fieldName] = value
    },
    remove_item: (state, payload) => {
      state.addInvoice.items_count--
      state.addInvoice.items.splice(payload, 1)
    }
  },
  actions: {
    sendInvoice: ({state, commit}) => {
      const regex = new RegExp('/', 'g')
      const _ivoiceNumber = state.addInvoice.number.replace(regex, '_')
      const id = `${Date.now()}-${_ivoiceNumber}`
      state.addInvoice.id = id
      firebase.firestore()
        .collection('invoices')
        .doc(id)
        .set(state.addInvoice)
        .then(
          commit('alert/setAlert', {
            message: 'Zapisano',
            variant: 'success',
            duration: 2
          }, {root: true})
        )
    },
    getInvoices: ({state, commit}) => {
      state.invoices = []
      firebase.firestore()
        .collection('invoices')
        .get()
        .then(query => {
          query.docs.forEach(doc => {
            state.invoices.push(doc.data())
          })
        })
        .then(
          commit('alert/setAlert', {
            message: 'Wczytano faktury',
            variant: 'success',
            duration: 2
          }, {root: true})
        )
    },
    deleteInvoice: ({commit, dispatch}, id, number) => {
      firebase.firestore()
        .collection('invoices')
        .doc(id)
        .delete()
        .then(
          commit('alert/setAlert', {
            message: 'Usunięto fakrurę' + number,
            variant: 'danger',
            duration: 2
          }, {root: true})
        )
      dispatch('getInvoices')
    }
  }
}
