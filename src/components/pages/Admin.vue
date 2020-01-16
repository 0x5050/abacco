<template>
    <div>
        Admin
        <button @click="signout">SignOut</button>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'admin',
  methods: {
    signout () {
      firebase.auth().signOut().then(user => {
        this.$router.replace('/login')
      })
    }
  }
}
</script>
