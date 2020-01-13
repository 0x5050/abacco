<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" :sticky='true'>
    <img src="../assets/logo.png" width="50px" height="50px">
    <b-navbar-brand href="/">Abacco</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-button
        v-for="button in buttons"
        :key="button.name"
        :href="button.href"
        variant="dark"
        class="ml-1"
        >
          {{ button.name }}
        </b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'nav-bar',
  data: () => ({
    buttons: [
      {
        name: 'Galeria',
        href: '#gallery'
      },
      {
        name: 'Informacje',
        href: '#Information'
      },
      {
        name: 'Usługi',
        href: '#services'
      },
      {
        name: 'Kontakt',
        href: '#contact'
      }
    ]
  })
}
</script>
