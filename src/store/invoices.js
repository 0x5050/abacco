export default {
  namespaced: true,
  state: {
    date: '',
    worth: 0,
    number: '',
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
  getters: {
    invoice: state => state
  },
  mutations: {
    set_invoice_value: (state, {param, value}) => { state[param] = value },
    set_invoice_item_value: (state, {fieldName, index, value}) => { state.items[index - 1][fieldName] = value }
  },
  actions: {
  }
}
