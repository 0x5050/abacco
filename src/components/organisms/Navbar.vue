<template>
  <b-navbar sticky toggleable="lg" type="dark" variant="dark" class="text-light">
    <b-navbar-nav class="mr-auto align-middle">
      <b-container>
        <b-row>
          <b-col>
            <b-button @click="setSidebarStatus" class="hide" variant="primary" aria-hidden="true" size="lg">
              <b-icon icon="list" scale="1.5" class="pt-1"/>
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-navbar-nav>
      <b-navbar-nav class="ml-auto align-middle">
        <b-container>
          <b-row>
            <b-col md class="d-flex">
              <p class="m-auto align-middle font-weight-bolder align-self-center">{{ user }} </p>
            </b-col>
            <b-col md class="d-flex">
              <b-button :class="buttonClass" variant="info" :to="`/${rootPath}/settings`">
                <b-icon icon="gear" scale="2" class="pt-1 mr-1" /> Ustawienia
              </b-button>
            </b-col>
            <b-col md class="d-flex">
              <b-button :class="buttonClass" @click="LogOut" variant="danger">
                <b-icon icon="power" scale="2" class="pt-1" /> Wyloguj
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-navbar-nav>
  </b-navbar>
</template>

<script>
import firebase from 'firebase'
import { mapMutations } from 'vuex'

export default {
  name: 'O-Navbar',
  props: {
    rootPath: {type: String, default: 'employee'}
  },
  data: () => ({
    user: '',
    buttonClass: 'w-100 mr-auto ml-auto align-middle mr-5'
  }),
  created () {
    firebase.auth().currentUser.getIdTokenResult()
      .then(tokenResult => {
        this.user = tokenResult.claims.email
      })
  },
  methods: {
    ...mapMutations('sidebar', ['setSidebarStatus']),
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
