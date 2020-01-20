<template>
    <div>
      <navbar />
      <sidebar/>
    </div>
</template>

<script>
import Navbar from '@/components/pages/admin_page/Navbar'
import Sidebar from '@/components/pages/panel'

export default {
  name: 'employee',
  components: {
    Navbar,
    Sidebar
  },
  methods: {
  }
}
</script>
