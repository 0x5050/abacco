<template>
  <b-container fluid>
    <h1 class="text-left">
      Faktury
    </h1>
    <b-button
      v-b-toggle="collapsedId"
      variant="success"
      size="lg"
    >
      Dodaj Fakturę
    </b-button>
    <b-collapse :id="collapsedId">
      <o-invoices-add />
    </b-collapse>
    <o-invoices-display />
  </b-container>
</template>

<script>
import OInvoicesAdd from '@/components/organisms/InvoicesAdd'
import OInvoicesDisplay from '@/components/organisms/InvoicesDisplay'

export default {
  name: 'T-Invoices',
  components: {
    OInvoicesAdd,
    OInvoicesDisplay
  },
  data: () => ({
    collapsedId: 'add'
  })
}
</script>
