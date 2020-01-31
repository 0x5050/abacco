<template>
  <b-container class="pt-5">
    <b-card
      v-for="invoice in invoices"
      :key="invoice.id"
      :title="invoice.number"
      :sub-title="invoiceDate(invoice.date)"
      class="text-left"
    >
    <div class="mt-2 mb-2">
      <b-button
        variant="danger"
        @click="deleteInvoice(invoice.id, invoice.number)"
      >
        Usuń
      </b-button>
      <b-button
        class="float-right"
        v-b-toggle="invoice.number"
      >
        Rozwiń
      </b-button>
    </div>
    <b-collapse :id="invoice.number">
      <b-card>
        <b-row>
          <b-col>
            <h1>
              Sprzedawca
            </h1>
          </b-col>
          <b-col>
            <h1>
              Nabywca
            </h1>
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
import { DateTime } from 'luxon'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'O-Invoices-Display',
  computed: {
    ...mapGetters('invoices', ['invoices'])
  },
  mounted () {
    this.getInvoices()
  },
  methods: {
    ...mapMutations('invoices', ['set_invoice_value']),
    ...mapActions('invoices', ['getInvoices', 'deleteInvoice']),
    invoiceDate (date) {
      return DateTime.fromISO(date).toFormat('D').toString()
    },
    ItemList (items) {
      const arr = []
      let iterator = 0
      items.forEach((item) => {
        if (item.name === '') return
        iterator++
        arr.push({
          lp: iterator,
          nazwa: item.name,
          ilość: item.count,
          cena_netto: item.price + 'zł',
          vat: item.vat_rate + '%',
          cena_brutto: (item.price * (1 + (item.vat_rate / 100))) * item.count
        })
      })
      return arr
    }
  }
}
</script>
