<template>
  <div>
    <control-panel
      :links="routes"
      root-path="admin"
    />
  </div>
</template>
<script>
import ControlPanel from '@/components/templates/ControlPanel'

export default {
  name: 'P-Admin',
  components: {
    ControlPanel
  },
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
      },
      {
        name: 'Godziny',
        path: '/hours',
        icon: 'calendar'
      }
    ]
  })
}
</script>
