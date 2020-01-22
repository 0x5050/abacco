<template>
    <b-container class="pt-5">
        {{ invoice }}
        <b-row>
            <b-col md>
            <b-input-group prepend="Data">
                <Datetime @input="setDate($event)" input-class="form-control"/>
            </b-input-group>
            </b-col>
            <b-col md>
                <b-input-group prepend="Numer Faktury">
                    <b-input @input="set_invoice_value({fieldName: 'number', value: $event})"/>
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
                    <b-input @input="set_invoice_value({fieldName: 'worth', value: $event})"/>
                </b-input-group>
            </b-col>
        </b-row>
        <b-button @click="saveInvoice">Zapisz</b-button>
    </b-container>
</template>

<script>
import MInvoicesItemAdd from '@/components/molecules/InvoiceItemAdd'
import { Datetime } from 'vue-datetime'
import { DateTime } from 'luxon'
import { mapGetters, mapMutations } from 'vuex'

import firebase from 'firebase'

export default {
  name: 'P-A-Invoices-Menagment',
  components: {
    MInvoicesItemAdd,
    Datetime
  },
  computed: {
    ...mapGetters('invoices', ['invoice'])
  },
  methods: {
    ...mapMutations('invoices', ['set_invoice_value']),
    setDate (event) {
      const date = DateTime.fromISO(event).toFormat('D')
      this.set_invoice_value({fieldName: 'date', value: date})
    },
    addItem () {
      this.invoice.items_count++
      this.invoice.items.push({name: '', count: 1, price: 0, vat_rate: 23})
    },

    saveInvoice () {
      const regex = new RegExp('/', 'g')
      const _ivoiceNumber = this.invoice.number.replace(regex, '_')
      firebase.firestore()
        .collection('invoices')
        .doc(`${Date.now()}-${_ivoiceNumber}`)
        .set(this.invoice)
    }
  }
}
</script>
