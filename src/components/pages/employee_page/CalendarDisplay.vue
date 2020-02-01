<template>
  <b-container class="pt-5">
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
          stacked="lg"
          :fields="fields"
          :items="prepareDate(days)"
        />
        </span>
      </b-collapse>
    </b-card >
  </b-container>
</template>

<script>
import firebase from 'firebase'
import { DateTime } from 'luxon'

export default {
  name: 'P-E-Calendar-Display',
  data: () => ({
    uid: '',
    months: [],
    options: [],
    fields: ['data', 'godzina_rozpoczęcia', 'godzina_zakończenia', 'opis']
  }),
  async created () {
    await firebase.auth().onAuthStateChanged(user => {
      this.uid = user.uid
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
    prepareDate (days) {
      const _arr = []
      const _objectKeys = Object.keys(days)
      for (let objectKey of _objectKeys) {
        _arr.push(days[objectKey])
      }
      return _arr
    },
    async fetchData () {
      const previousMonth = DateTime.local().minus({month: 1}).monthLong
      const actualMonth = DateTime.local().monthLong
      const _monthsArr = [actualMonth, previousMonth]
      console.log()
      this.months = []
      await _monthsArr.forEach(month => {
        firebase.firestore()
          .collection('employee-hours')
          .doc(this.uid)
          .collection(DateTime.local().year.toString())
          .doc(month)
          .get()
          .then(doc => this.months.push({[doc.id]: doc.data()}))
      })
    }
  }
}
</script>
