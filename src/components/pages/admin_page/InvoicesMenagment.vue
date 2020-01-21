<template>
    <b-container class="pt-5">
        <b-row>
            <b-col md>
            <b-input-group prepend="Data">
                <Datetime input-class="form-control"/>
            </b-input-group>
            </b-col>
            <b-col md>
                <b-input-group prepend="Numer Faktury">
                    <b-input />
                </b-input-group>
            </b-col>
        </b-row>
        <b-card class="mt-3 mb-3 text-left" title="Towary/Usługi">
            <m-invoices-item-add
                v-for="item in invoice.items_count"
                :key="item"
                :value="invoice"
                :iterator="item"
                class="mt-4 mb-4"
                />
                <b-row class="ml-auto">
                    <b-button @click="addItem" size="lg" variant="success" class="ml-auto mr-4">
                        +
                    </b-button>
                </b-row>
        </b-card>
        <b-row>
            <b-col md>
                <b-input-group prepend="Wartość">
                    <b-input />
                </b-input-group>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import MInvoicesItemAdd from '@/components/molecules/InvoiceItemAdd'
import { Datetime } from 'vue-datetime'

import firebase from 'firebase'

export default {
  name: 'P-A-Invoices-Menagment',
  components: {
    MInvoicesItemAdd,
    Datetime
  },
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
