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
    result: []
  }),
  async created () {
    const firestore = firebase.firestore()
    const users = await firestore.collection('roles').get()
    const employeeHours = await firestore.collection('employee-hours').get()
    const _usersArr = []
    const _employeeHoursArr = []

    users.docs.map(doc => {
      _usersArr.push({
        email: doc.data().email,
        uid: doc.id
      })
    })

    employeeHours.docs.map(doc => {
      const documentID = doc.id
      _employeeHoursArr.push({
        uid: documentID.slice(0, 28),
        month: documentID.slice(29, 31),
        year: documentID.slice(32, 37),
        data: doc.data(),
        email: ''
      })
    })

    let id = 0

    _usersArr.forEach(user => {
     _employeeHoursArr.forEach(hour => {
        if (hour.uid === user.uid) {
          this.result.push({
            email: user.email,
            uid: user.uid,
            month: hour.month,
            year: hour.year,
            data: hour.data,
            id: id
          })
          id++
        }
      })
    })
  }
}
</script>
