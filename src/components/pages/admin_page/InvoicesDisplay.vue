<template>
  <b-container>
    <b-card
      v-for="invoice in invoices"
      :key="invoice.number"
      :title="invoice.number"
      :sub-title="invoice.date"
    >
    <b-button
      v-b-toggle="invoice.number"
    >
      Rozwiń
    </b-button>
    <b-collapse :id="invoice.number">
      <b-card>
        <b-row>
          <b-col>
            <h1>Sprzedawca</h1>
          </b-col>
          <b-col>
            <h1>Nabywca</h1>
          </b-col>
        </b-row>
        <b-row>
            <b-card title="Towary/Usługi" class="w-100 text-left">
                <b-table
                  responsive
                  striped
                  hover
                  stacked="md"
                  :items="ItemList(invoice.items)"
                />
            </b-card>
        </b-row>
      </b-card>
    </b-collapse>
    </b-card>
  </b-container>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'P-A-Invoices-Display',
  components: {
  },
  data: () => ({
    invoices: []
  }),
  methods: {
    ItemList (items) {
      const arr = []
      let iterator = 0
      items.forEach((item) => {
        iterator++
        arr.push({
          lp: iterator,
          nazwa: item.name,
          ilość: item.count,
          cena_netto: item.price + 'zł',
          vat: item.vat_rate + '%',
          cena_brutto: item.price * (1 + (item.vat_rate / 100))
        })
      })
      return arr
    }
  },
  async created () {
    {
      const snapshot = await firebase.firestore().collection('invoices').get()
      this.invoices = snapshot.docs.map(doc => doc.data()) }
  }
}
</script>
