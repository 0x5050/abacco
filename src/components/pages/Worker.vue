<template>
    <div>
        Employee
        <button @click="signout">SignOut</button>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'employee',
  methods: {
    signout () {
      firebase.auth().signOut().then(user => {
        this.$router.replace('/login')
      })
    }
  }
}
</script>
