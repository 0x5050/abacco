<template>
  <b-container fluid class="m-0 p-0">
      <navbar />
      <sidebar />
  </b-container>
</template>
<script>
import Navbar from '@/components/pages/admin_page/Navbar'
import Sidebar from '@/components/pages/admin_page/Sidebar'

export default {
  data: () => ({
  }),
  components: {
    Navbar,
    Sidebar
  },
  methods: {
  }
}
</script>
