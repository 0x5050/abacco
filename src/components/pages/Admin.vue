<template>
  <b-container fluid class="m-0 p-0">
      <navbar />
      <sidebar
        root-path="admin"
        :routes="routes"
      />
  </b-container>
</template>
<script>
import Navbar from '@/components/pages/admin_page/Navbar'
import Sidebar from '@/components/pages/Panel'

export default {
  data: () => ({
    routes: [
      {
        name: 'Panel',
        path: '/',
        icon: 'graph-up'
      },
      {
        name: 'Użytkownicy',
        path: '/user-menagment',
        icon: 'person-fill'
      },
      {
        name: 'Faktury',
        path: '/invoices',
        icon: 'document-text'
      }
    ]
  }),
  components: {
    Navbar,
    Sidebar
  }
}
</script>
