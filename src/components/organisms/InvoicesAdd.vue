<template>
  <b-container class="pt-5">
    <!-- Date & Number input -->
    <b-row>
      <b-col md>
        <b-input-group prepend="Data">
          <Datetime
            v-model="invoice.date"
            :max-datetime="todayDate"
            input-class="form-control"
          />
        </b-input-group>
      </b-col>
      <b-col md>
        <b-input-group
          prepend="Numer Faktury"
        >
          <b-input
            v-model="$v.invoice.number.$model"
            :state="validation('number')"
            placeholder="Pole wymagane"
          />
          <b-form-invalid-feedback>
            {{ validationMessage }}
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
        <b-input-group prepend="Wartość" append="ZŁ">
          <b-input
            @input="set_invoice_value({fieldName: 'worth', value: $event})"
            type="number"
            :value="invoiceWorth()"
          />
        </b-input-group>
      </b-col>
    </b-row>

    <b-row class="ml-auto mt-2 mb-2">
      <b-button
        variant="success"
        @click="saveInvoice()"
        :disabled="invoice.number === '' ||  invoice.number === null"
      >
        Zapisz
      </b-button>
    </b-row>
  </b-container>
</template>

<script>
import MInvoicesItemAdd from '@/components/molecules/InvoiceItemAdd'

import { DateTime } from 'luxon'
import { Datetime } from 'vue-datetime'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'O-Invoices-Add',
  components: {
    MInvoicesItemAdd,
    Datetime
  },
  data: () => ({
    validationMessage: 'Pole nie może być puste',
    todayDate: DateTime.local().toString()
  }),
  computed: {
    ...mapGetters('invoices', ['invoice'])
  },
  methods: {
    ...mapActions('invoices', ['sendInvoice', 'getInvoices']),
    ...mapMutations('invoices', ['set_invoice_value']),
    invoiceWorth () {
      let result = 0
      this.invoice.items.forEach(item => {
        result += (item.price * (1 + (item.vat_rate / 100))) * item.count
      })
      return this.set_invoice_value({
        fieldName: 'worth',
        value: result
      })
    },

    saveInvoice () {
      this.sendInvoice()
      this.getInvoices()
    },

    addItem () {
      this.invoice.items_count++
      this.invoice.items.push({
        name: '',
        count: 1,
        price: 0,
        vat_rate: 23
      })
    },

    validation (name) {
      const { $dirty, $error } = this.$v.invoice[name]
      return $dirty ? !$error : null
    }
  },
  validations: {
    invoice: {
      number: {
        required
      }
    }
  }
}
</script>
