<template>
    <div>
        <nav-bar />
        <information />
        <gallery />
    </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Information from '@/components/Information'
import Gallery from '@/components/Gallery'

export default {
  name: 'Main',
  components: {
    NavBar,
    Information,
    Gallery
  },
  data: () => ({

  })
}
</script>
