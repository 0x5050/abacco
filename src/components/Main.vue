<template>
    <div>
        <nav-bar />
        <information />
        <gallery />
        <services />
        <contact />
    </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Information from '@/components/Information'
import Gallery from '@/components/Gallery'
import Services from '@/components/Services'
import Contact from '@/components/Contact'

export default {
  name: 'Main',
  components: {
    NavBar,
    Information,
    Gallery,
    Contact,
    Services
  },
  data: () => ({

  })
}
</script>
