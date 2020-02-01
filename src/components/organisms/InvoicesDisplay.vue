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
      <b-button-group class="float-right">
        <b-button
          v-model="expandButton"
          variant="primary"
          v-b-toggle="invoice.number"
          @click="expandButton = !expandButton"
        >
          <span v-if="expandButton">
            Rozwiń
          </span>
          <span v-else>
            Zwiń
          </span>
        </b-button>
        <b-button
          variant="info"
          @click="openInvoice(invoice)"
        >
          Otwórz
        </b-button>
        <b-button
          variant="success"
          @click="downloadInvoice(invoice)"
        >
          Pobierz
        </b-button>
      </b-button-group>
    </div>
    <b-collapse :id="invoice.number">
      <b-card>
        <b-row>
          <b-col class="mb-1" md>
            <h2>
              Sprzedawca
            </h2>
            {{ invoice.sender.name }} <br>
            {{ invoice.sender.street }} <br>
            {{ invoice.sender.zip }} {{ invoice.sender.city }} <br>
            NIP: {{ invoice.sender.nip }}
          </b-col>
          <b-col class="mb-1" md>
            <h2>
              Nabywca
            </h2>
            {{ invoice.recipient.name }} <br>
            {{ invoice.recipient.street }} <br>
            {{ invoice.recipient.zip }} {{ invoice.recipient.city }} <br>
            NIP: {{ invoice.recipient.nip }}
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

import {prepareInvoice} from '@/backend/invoicePDFGenerator'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs

export default {
  name: 'O-Invoices-Display',
  data: () => ({
    expandButton: true
  }),
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
    },

    downloadInvoice (invoice) {
      const Date = DateTime.fromISO(invoice.date).toFormat('D')
      pdfMake.createPdf(prepareInvoice(invoice)).download(`${invoice.number}_${Date}.pdf`)
    },

    openInvoice (invoice) {
      pdfMake.createPdf(prepareInvoice(invoice)).open()
    }
  }
}
</script>
