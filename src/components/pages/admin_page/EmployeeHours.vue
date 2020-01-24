<template>
  <div>
  <div v-for="hour in result" :key="hour.id">
    {{ hour.email }} {{ hour.month }} {{ hour.year }} <br>
  </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'P-A-Employee-Hours',
  data: () => ({
    users: [],
    hours: [],
    result: []
  }),
  async created () {
    const users = await firebase.firestore().collection('roles').get()
    users.docs.map(doc => {
      this.users.push({email: doc.data().email, uid: doc.id})
    })

    const hours = await firebase.firestore().collection('employee-hours').get()
    hours.docs.map(doc => {
      const documentID = doc.id
      this.hours.push({
        uid: documentID.slice(0, 28),
        month: documentID.slice(29, 31),
        year: documentID.slice(32, 37),
        data: doc.data(),
        email: ''
      })
    })
    let i = 0
    this.users.forEach(user => {
      this.hours.forEach(hour => {
        if (hour.uid === user.uid) {
          this.result.push({
            email: user.email,
            uid: user.uid,
            month: hour.month,
            year: hour.year,
            data: hour.data,
            id: i
          })
          i++
        }
      })
    })
  }
}
</script>
