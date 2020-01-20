<template>
    <div class="bg-dark h-100 w-100 position-fixed">
      <b-container class=" text-left text-light center">
          <b-form @submit="LoginUser">
            Email
            <b-input-group md="w-100" prepend="✉️" class="mb-3 mt-1">
              <b-form-input type="email" v-model="login_form.email"/>
            </b-input-group>
            Hasło
            <b-input-group prepend="🔑" class="mt-1">
              <b-form-input type="password" v-model="login_form.password"/>
            </b-input-group>
            <b-button class="w-25 mt-3" type="submit">Login</b-button>
          </b-form>
        </b-container>
        <b-button @click="RegisterUser">Register</b-button>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'P-Login',
  data: () => ({
    login_form: {
      email: '',
      password: ''
    }
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
        .createUserWithEmailAndPassword(this.login_form.email, this.login_form.password)
        .then(console.log('Created User'))
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
