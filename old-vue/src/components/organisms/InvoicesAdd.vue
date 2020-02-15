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

    <b-row class="mt-2">
      <b-col class="text-left mb-2">
        <h2>{{ left.text }}</h2>
        <b-select
          :value="invoice.sender"
          :options="senders"
          @input="set_invoice_value({fieldName: left.value, value: $event})"
        />
      </b-col>
      <b-col class="d-flex" lg>
        <b-button
          variant="info"
          class="m-auto"
          @click="swapSenderRecipment()"
        >
          <b-icon
            icon="arrow-left-right"
            class="pt-1"
            scale="1.7"
          />
        </b-button>
      </b-col>
      <b-col class="text-left mb-2">
        <h2>{{ right.text }}</h2>
        <b-select
          :options="recipients"
           @input="set_invoice_value({fieldName: right.value, value: $event})"
        />
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

import firebase from 'firebase'

export default {
  name: 'O-Invoices-Add',
  components: {
    MInvoicesItemAdd,
    Datetime
  },
  data: () => ({
    validationMessage: 'Pole nie może być puste',
    todayDate: DateTime.local().toString(),
    selectedSender: 'abacco',
    // TODO load senders from firebase (config page)
    senders: [
      {
        text: 'PPHU Abacco',
        value: {
          name: 'PPHU ABACCO',
          street: 'Aleja Grunwaldzka 238 d',
          zip: '80-266',
          city: 'Gdańsk'
        }
      },
      {
        text: 'PPUH Krystyna Cierlicka',
        value: {
          name: 'PPHU Krystyna Cierlicka',
          street: 'Warneńska 12c/2',
          zip: '80-288',
          city: 'Gdańsk'
        }
      }
    ],
    recipients: [],
    left: {
      text: 'Sprzedawca',
      value: 'sender'
    },
    right: {
      text: 'Nabywca',
      value: 'recipient'
    }
  }),
  computed: {
    ...mapGetters('admin/invoices', ['invoice'])
  },
  created () {
    this.getContacts()
  },
  methods: {
    ...mapActions('admin/invoices', ['sendInvoice', 'getInvoices']),
    ...mapMutations('admin/invoices', ['set_invoice_value']),
    swapSenderRecipment () {
      const _recipients = this.recipients
      const _senders = this.senders

      this.recipients = _senders
      this.senders = _recipients

      this.set_invoice_value({ fieldName: 'sender', value: {} })
      this.set_invoice_value({ fieldName: 'recipient', value: {} })

      if (this.left.text === 'Sprzedawca') {
        this.left.text = 'Nabywca'
        this.left.value = 'recipient'
        this.right.text = 'Sprzedawca'
        this.right.value = 'sender'
      } else {
        this.left.text = 'Sprzedawca'
        this.left.value = 'sender'
        this.right.text = 'Nabywca'
        this.right.value = 'recipient'
      }
    },
    getContacts () {
      firebase.firestore()
        .collection('contacts')
        .get()
        .then(query => {
          query.docs.forEach(doc => {
            this.recipients.push({
              label: doc.data().name,
              options: [{
                text: doc.data().street,
                value: doc.data()
              }]
            })
          })
        })
    },
    invoiceWorth () {
      let result = 0
      this.invoice.items.forEach(item => {
        result += (item.price * (1 + (item.vat_rate / 100))) * item.count
      })
      this.set_invoice_value({
        fieldName: 'worth',
        value: result
      })
      return result
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
