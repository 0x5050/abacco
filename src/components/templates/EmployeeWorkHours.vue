<template>
  <b-container class="pt-5">

    <b-select
      :options="userOptions"
      v-model="user"
      @change="fetchData()"
    />
    <b-input-group prepend="Rok" size="lg">
      <b-select @change="fetchData()" :options="options" v-model="year"/>
    </b-input-group>

    <b-card
      v-for="month in months"
      :key="Object.keys(month).toString()"
      :title="Object.keys(month).join()"
      class="text-left mt-1"
    >
    <b-button
      v-b-toggle="Object.keys(month).join()"
      variant="info"
    >
      Rozwiń
    </b-button>
      <b-collapse :id="Object.keys(month).join()">
        <span
          v-for="days in month"
          :key="Object.keys(days).toString()"
        >
        <b-table
          responsive
          striped
          hover
          :items="prepareDate(days)"
        />
        </span>
      </b-collapse>
    </b-card >
  </b-container>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'T-Employee-Hours',
  data: () => ({
    year: '2020',
    years: [],
    userOptions: [],
    user: 'lFTHV5opiGYVgWDTLjyBALyFOtt1',
    employeeHoursArr: [],
    options: [],
    months: []
  }),
  async created () {
    const firestore = firebase.firestore()
    const users = await firestore.collection('roles').get()
    const _usersArr = []

    users.docs.map(doc => {
      _usersArr.push({
        email: doc.data().email,
        uid: doc.id
      })
    })

    _usersArr.forEach(user => {
      this.userOptions.push({
        value: user.uid,
        text: user.email
      })
    })

    this.fetchData()
  },
  mounted () {
    const minYear = 2020
    let _year = new Date().getFullYear()
    for (_year; _year >= minYear; _year--) {
      this.options.push({value: _year.toString(), text: _year.toString()})
    }
  },
  methods: {
    async fetchData () {
      this.months = []
      await firebase.firestore()
        .collection('employee-hours')
        .doc(this.user)
        .collection(this.year.toString())
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.months.push({[doc.id]: doc.data()})
          })
        })
    },
    prepareDate (days) {
      const _arr = []
      const _objectKeys = Object.keys(days)
      for (let objectKey of _objectKeys) {
        _arr.push(days[objectKey])
      }
      return _arr
    }
  }
}
</script>
