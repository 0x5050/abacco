<template>
    <b-container class="pt-5">
        <b-row>
            <b-col md>
              <b-input-group prepend="Data">
                  <Datetime v-model="invoice.date" :max-datetime="localDate"  input-class="form-control"/>
              </b-input-group>
            </b-col>
            <b-col md>
                <b-input-group prepend="Numer Faktury">
                    <b-input  v-model="$v.invoice.number.$model" :state="validation('number')"/>
                    <b-form-invalid-feedback>
                      Pole nie może być puste
                    </b-form-invalid-feedback>
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
                    <b-button
                      @click="addItem"
                      size="lg"
                      variant="success"
                      class="ml-auto mr-4"
                    >
                        +
                    </b-button>
                </b-row>
        </b-card>
        <b-row>
            <b-col md>
                <b-input-group prepend="Wartość">
                    <b-input
                      @input="set_invoice_value({fieldName: 'worth', value: $event})"
                    />
                </b-input-group>
            </b-col>
        </b-row>
        <b-button @click="saveInvoice">Zapisz</b-button>
    </b-container>
</template>

<script>
import MInvoicesItemAdd from '@/components/molecules/InvoiceItemAdd'
import { DateTime } from 'luxon'
import { Datetime } from 'vue-datetime'
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'

import firebase from 'firebase'

export default {
  name: 'P-A-Invoices-Menagment',
  components: {
    MInvoicesItemAdd,
    Datetime
  },
  computed: {
    ...mapGetters('invoices', ['invoice']),
    localDate () {
      return DateTime.local().toString()
    }
  },
  validations: {
    invoice: {
      number: {
        required
      }
    }
  },
  methods: {
    addItem () {
      this.invoice.items_count++
      this.invoice.items.push({name: '', count: 1, price: 0, vat_rate: 23})
    },

    validation (name) {
      const { $dirty, $error } = this.$v.invoice[name]
      return $dirty ? !$error : null
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
