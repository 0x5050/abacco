<template>
    <div>
        <nav-bar />
        <information />
        <gallery />
        <contact />
    </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Information from '@/components/Information'
import Gallery from '@/components/Gallery'
import Contact from '@/components/Contact'

export default {
  name: 'Main',
  components: {
    NavBar,
    Information,
    Gallery,
    Contact
  },
  data: () => ({

  })
}
</script>
