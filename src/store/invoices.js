import { DateTime } from 'luxon'

export default {
  namespaced: true,
  state: {
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
    ],
    invoices: []
  },
  getters: {
    invoice: state => state,
    invoice_date: state => DateTime.fromISO(state.date).toFormat('D'),
    invoices: state => state.invoices
  },
  mutations: {
    set_invoice_value: (state, {fieldName, value}) => { state[fieldName] = value },
    set_invoice_item_value: (state, {fieldName, index, value}) => { state.items[index - 1][fieldName] = value },
    remove_item: (state, payload) => {
      state.items_count--
      state.items.splice(payload, 1)
    }
  },
  actions: {
  }
}
