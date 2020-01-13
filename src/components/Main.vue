<template>
    <div>
        <nav-bar />
        <information />
    </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Information from '@/components/Information'

export default {
  name: 'Main',
  components: {
    NavBar, Information
  },
  data: () => ({

  })
}
</script>
