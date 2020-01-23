<template>
  <div>
    <control-panel>
      <p-e-work-hours />
    </control-panel>
  </div>
</template>
<script>
import ControlPanel from '@/components/templates/ControlPanel'
import PEWorkHours from '@/components/pages/employee_page/WorkHours'

export default {
  name: 'P-Employee',
  components: {
    ControlPanel,
    PEWorkHours
  }
}
</script>
