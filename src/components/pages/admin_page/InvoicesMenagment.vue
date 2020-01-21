<template>
    <div>
        <b-container class="pt-5">
            <h1 class="text-left">Dodaj fakturę</h1>
            <b-row>
                <b-col md>
                <b-input-group prepend="Data">
                    <b-input />
                </b-input-group>
                </b-col>
                <b-col md>
                    <b-input-group prepend="Numer Faktury">
                        <b-input />
                    </b-input-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                  <h3 class="text-left mt-2">Towary/Usługi</h3>
                </b-col>
            </b-row>
            <m-invoices-item-add
             v-for="item in invoice.items_count"
             :key="item"
             :value="invoice"
             :iterator="item"
             />
            <b-button variant="success">
                <b-icon icon="plus" font-scale="2" class="mt-1" @click="addItem"/>
            </b-button>
            <b-row>
                <b-col md>
                    <b-input-group prepend="Wartość">
                        <b-input />
                    </b-input-group>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import MInvoicesItemAdd from '@/components/molecules/InvoiceItemAdd'

import firebase from 'firebase'

export default {
  name: 'P-A-Invoices-Menagment',
  components: {
    MInvoicesItemAdd
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
