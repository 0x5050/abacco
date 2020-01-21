<template>
    <b-row>
        <b-col md>
            <b-input-group prepend="Nazwa">
            <b-form-input type="text" />
            </b-input-group>
        </b-col>
        <b-col md>
            <b-input-group prepend="Ilość">
            <b-form-input type="number" />
            </b-input-group>
        </b-col>
        <b-col md>
            <b-input-group prepend="Cena" append="ZŁ">
            <b-form-input type="number" />
            </b-input-group>
        </b-col>
        <b-col md>
            <b-input-group prepend="VAT">
            <b-form-select :options="vatRates"/>
            </b-input-group>
        </b-col>
        <b-col md="1" class="text-left mt-1">
            <b-button @click="removeItem" variant="danger">X</b-button>
        </b-col>
    </b-row>
</template>

<script>
export default {
  name: 'M-Invoices-Item-Add',
  props: {
    value: { type: Object, default: () => {} },
    iterator: { type: Number, default: null }
  },
  data: () => ({
    vatRates: [
      { value: 0, text: '0%' },
      { value: 8, text: '8%' },
      { value: 12, text: '12%' },
      { value: 24, text: '24%' }
    ]
  }),
  methods: {
    removeItem () {
      console.log(this.iterator)
    //   arr.splice(this.iterator - 1, 1)
    }
  }
}
</script>
