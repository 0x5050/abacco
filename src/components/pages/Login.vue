<template>
    <div>
        Email <b-form-input type="email" v-model="email" /> <br>
        Password <b-form-input type="password" v-model="password" /> <br>
        <b-button @click="login">Login</b-button>
        <b-button @click="register">Register</b-button>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: ''
  }),
  created () {
    firebase.auth().onAuthStateChanged(userAuth => {
      if (userAuth) {
        firebase.auth().currentUser.getIdTokenResult()
          .then(tokenResult => {
            console.log(tokenResult.claims)
          })
      }
    })
  },
  methods: {
    login () {
      console.log('login', this.email, this.password)
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
    },

    register () {
      console.log('register', this.email, this.password)
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(data => {
          data.user.updateProfile({ displayName: this.email })
        }).catch(err => {
          alert(err.message)
        })
    }

  }
}
</script>
