<template>
    <b-row>
        <b-col
          v-for="input in inputs"
          :key="input.fieldName"
          class="mt-1"
          lg
        >
            <b-input-group
              :prepend="input.title"
              :append="input.append"
            >
              <b-form-input
                @input="set_invoice_item_value({fieldName: input.fieldName, index: iterator, value: $event})"
                :type="input.type"
                :value="invoice.items[iterator - 1][input.fieldName]"
              />
            </b-input-group>
        </b-col>
        <b-col lg class="mt-1">
            <b-input-group prepend="VAT">
              <b-form-select
                @input="set_invoice_item_value({fieldName: 'vat_rate', index: iterator, value: $event})"
                :options="vatRates"
                :value="invoice.items[iterator - 1].vat_rate"
              />
            </b-input-group>
        </b-col>
        <b-col lg="1" class="text-left mt-1">
            <b-button
              @click="remove_item(iterator - 1)"
              variant="danger"
            >
              X
            </b-button>
        </b-col>
    </b-row>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'M-Invoices-Item-Add',
  props: {
    value: { type: Object, default: () => {} },
    iterator: { type: Number, default: null }
  },
  data: () => ({
    inputs: [
      {
        title: 'Nazwa',
        append: '',
        type: 'text',
        fieldName: 'name'
      },
      {
        title: 'Ilość',
        append: '',
        type: 'number',
        fieldName: 'count'
      },
      {
        title: 'Cena',
        append: 'ZŁ',
        type: 'number',
        fieldName: 'price'
      }
    ],
    vatRates: [
      { value: 0, text: '0%' },
      { value: 8, text: '8%' },
      { value: 12, text: '12%' },
      { value: 23, text: '23%' }
    ]
  }),
  computed: {
    ...mapGetters('invoices', ['invoice'])
  },
  methods: {
    ...mapMutations('invoices', ['set_invoice_item_value', 'remove_item'])
  }
}
</script>
