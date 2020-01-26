<template>
  <b-container class="pt-5">
    <b-input-group prepend="Rok" size="lg">
      <b-select :options="options" v-model="year"/>
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
    year: '2020',
    // TODO refresh on @change
    options: [
      {
        value: '2020', text: '2020'
      }
    ],
    fields: [
      {
        prepend: 'Data',
        format: 'D',
        value: 'date'
      },
      {
        prepend: 'Początek',
        format: 'H:mm',
        value: 'start'
      },
      {
        prepend: 'Koniec',
        format: 'H:mm',
        value: 'stop'
      }
    ]
  }),
  methods: {
    prepareDate (days) {
      const arr = []
      const _objectKeys = Object.keys(days)
      for (let objectKey of _objectKeys) {
        arr.push(days[objectKey])
      }
      return arr
    },
    getMonth (item) {
      const firstDate = Object.keys(item)[0]
      const date = DateTime.fromISO(firstDate)
      const result = `${date.monthLong.charAt(0).toUpperCase() + date.monthLong.slice(1)} ${date.year}`
      return result
    },
    dateFormat (value, type) {
      return DateTime.fromISO(value).toFormat(type)
    }
  },
  async created () {
    await firebase.auth().onAuthStateChanged(user => {
      this.uid = user.uid
    })
    await firebase.firestore().collection('employee-hours').doc(this.uid).collection(this.year).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.months.push({[doc.id]: doc.data()})
        })
      })
  }
}
</script>
