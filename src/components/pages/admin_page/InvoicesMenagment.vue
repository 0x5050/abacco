<template>
    <div>
        data: <b-input v-model="invoice.date"/> <br>
        Wartość: <b-input v-model="invoice.worth"/> <br>
        Nr Faktury: <b-input v-model="invoice.number"/> <br>
        Przedmioty <button @click="addItem">Dodaj</button><br>
        <div v-for="item in invoice.items_count" :key="item">
            Nazwa: <b-input v-model="invoice.items[item - 1].name"/> <br>
            Ilość: <b-input v-model="invoice.items[item - 1].count"/> <br>
            Cena: <b-input v-model="invoice.items[item - 1].price"/> <br>
        </div>
        <b-button @click="saveInvoice">Zapisz</b-button>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'P-A-Invoices-Menagment',
  data: () => ({
    invoice: {
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
    }
  }),
  methods: {
    addItem () {
      this.invoice.items_count++
      this.invoice.items.push({name: '', count: 1, price: 0, vat_rate: 23})
    },

    saveInvoice () {
      firebase.firestore()
        .collection('invoices')
        .doc(`${Date.now()}-${this.invoice.number}`)
        .set(this.invoice)
    }
  }
}
</script>
