<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" class="text-light">
      <b-button class="hide" variant="primary" aria-hidden="true" size="lg">
          <b-icon @click="set_sidebar()" icon="list"/>
      </b-button>
      <b-navbar-nav class="ml-auto">
        <b-button @click="LogOut" variant="danger" size="md">
          <b-icon icon="power" /> Wyloguj
        </b-button>
      </b-navbar-nav>
  </b-navbar>
</template>

<script>
import firebase from 'firebase'
import { mapMutations } from 'vuex'

export default {
  name: 'O-Navbar',
  methods: {
    ...mapMutations(['set_sidebar']),
    LogOut () {
      firebase.auth().signOut()
        .then(user => {
          this.$router.push('/login')
        })
    }
  }
}
</script>

<style scoped>
@media only screen and (min-width: 750px) {
  .hide {
    transition: width 2s linear 1s;
    visibility: hidden;
  }
}
</style>
