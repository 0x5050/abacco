<template>
  <b-container fluid>
      <h1>Faktury</h1>
      <b-button
        v-b-toggle="'add'"
      >
        Dodaj Fakturę
      </b-button>
      <b-collapse id="add">
        <o-invoices-add />
      </b-collapse>
      <o-invoices-display />
  </b-container>
</template>

<script>
import OInvoicesAdd from '@/components/organisms/InvoicesAdd'
import OInvoicesDisplay from '@/components/organisms/InvoicesDisplay'

export default {
  name: 'P-A-Invoices',
  components: {
    OInvoicesAdd,
    OInvoicesDisplay
  }
}
</script>
