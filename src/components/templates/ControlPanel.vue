<template>
  <b-container fluid class="m-0 p-0">
      <o-navbar />
      <o-panel
        :root-path="rootPath"
        :routes="links"
      />
  </b-container>
</template>
<script>
import ONavbar from '@/components/organisms/Navbar'
import OPanel from '@/components/organisms/Panel'

export default {
  name: 't-control-panel',
  props: {
    links: { type: Array, default: () => [] },
    rootPath: { type: String, default: 'employee' }
  },
  components: {
    ONavbar,
    OPanel
  }
}
</script>
