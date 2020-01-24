<template>
  <div>
    <control-panel
      :links="routes"
    >
    </control-panel>
  </div>
</template>
<script>
import ControlPanel from '@/components/templates/ControlPanel'
import PEWorkHours from '@/components/pages/employee_page/WorkHours'
import PECalendarDisplay from '@/components/pages/employee_page/CalendarDisplay'

export default {
  name: 'P-Employee',
  components: {
    ControlPanel,
    PEWorkHours,
    PECalendarDisplay
  },
  data: () => ({
    routes: [
      {
        name: 'Praca',
        path: '/work',
        icon: 'wrench'
      },
      {
        name: 'Kalendarz',
        path: '/calendar',
        icon: 'calendar'
      }
    ]
  })
}
</script>
