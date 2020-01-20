<template>
  <b-container fluid class="m-0 p-0">
      <navbar />
      <sidebar
        :root-path="rootPath"
        :routes="links"
      />
  </b-container>
</template>
<script>
import Navbar from '@/components/pages/admin_page/Navbar'
import Sidebar from '@/components/pages/Panel'

export default {
  name: 't-control-panel',
  props: {
    links: { type: Array, default: () => [] },
    rootPath: { type: String, default: 'employee' }
  },
  components: {
    Navbar,
    Sidebar
  }
}
</script>
