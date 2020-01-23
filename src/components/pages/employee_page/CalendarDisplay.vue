<template>
  <div>
    Calendar
    {{ uid }}
    {{ data }}
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'P-E-Calendar-Display',
  data: () => ({
    uid: '',
    data: []
  }),
  async created () {
    await firebase.auth().onAuthStateChanged(user => {
      this.uid = user.uid
    })
    const snapshot = await firebase.firestore().collection('employee-hours').get()
    snapshot.docs.map(doc => {
      const userUID = doc.id.slice(0, 28)
      if (userUID === this.uid) {
        this.data.push(doc.data())
      }
    })
  }
}
</script>
