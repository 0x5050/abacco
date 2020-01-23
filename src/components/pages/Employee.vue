<template>
  <div>
    <control-panel>
      <p-e-work-hours />
      <p-e-calendar-display />
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
  }
}
</script>
