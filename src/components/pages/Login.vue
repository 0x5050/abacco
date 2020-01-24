<template>
<b-container fluid class="bg-dark h-100 position-fixed">
  <b-form
    class="ml-auto mr-auto center"
    @submit="LoginUser"
  >
  <b-row>
    <b-input-group
      v-for="input in inputs"
      :key="input.name"
      :prepend="input.name"
      class="mt-3"
      size="lg"
    >
      <b-input
        v-model="login_form[input.type]"
        :type="input.type"
      />
    </b-input-group>
  </b-row>
    <b-row>
      <b-button
        class="mt-3 d-block mr-auto"
        variant="info"
        size="lg"
        v-b-modal="'register-modal'"
      >
        Zarejestruj
      </b-button>
      <b-button
        class="mt-3 d-block ml-auto"
        variant="success"
        type="submit"
        size="lg"
      >
        Zaloguj
      </b-button>
    </b-row>
  </b-form>
  <b-modal id="register-modal" hide-footer title="Zarejestruj się">
    <b-input-group
      v-for="input in inputs"
      :key="input.name"
      :prepend="input.name"
      class="mt-3"
      size="lg"
    >
      <b-input
        v-model="register_form[input.type]"
        :type="input.type"
      />
    </b-input-group>
    <b-button
        class="mt-3 d-block ml-auto"
        variant="success"
        size="lg"
        @click="RegisterUser"
    >
        Zarejestruj
    </b-button>
  </b-modal>
</b-container>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'P-Login',
  data: () => ({
    login_form: {
      email: '',
      password: ''
    },
    register_form: {
      email: '',
      password: ''
    },
    inputs: [
      {
        name: '✉️',
        type: 'email'
      },
      {
        name: '🔑',
        type: 'password'
      }
    ]
  }),
  created () {
    firebase.auth().onAuthStateChanged(userAuth => {
      if (userAuth) {
        firebase.auth().currentUser.getIdTokenResult()
          .then(tokenResult => {
            console.log('Zalogowano:', tokenResult.claims.email)
          })
      }
    })
  },
  methods: {
    LoginUser () {
      firebase.auth()
        .signInWithEmailAndPassword(this.login_form.email, this.login_form.password)
        .then(this.$router.push('/employee'))
    },
    RegisterUser () {
      firebase.auth()
        .createUserWithEmailAndPassword(this.register_form.email, this.register_form.password)
        .then(console.log('Utworzono konto'))
    }
  }
}
</script>

<style scoped>
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
