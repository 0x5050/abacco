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
import NavBar from '@/components/pages/client_page/NavBar'
import Information from '@/components/pages/client_page/Information'
import Gallery from '@/components/pages/client_page/Gallery'
import Services from '@/components/pages/client_page/Services'
import Contact from '@/components/pages/client_page/Contact'

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
