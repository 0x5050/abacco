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
    fields: ['data', 'godzina_rozpoczęcia', 'godzina_zakończenia', 'przerwa', 'suma', 'opis']
  }),
  async created () {
    await firebase.auth().onAuthStateChanged(user => {
      this.uid = user.uid
    })
    this.fetchData()
  },
  methods: {
    prepareDate (days) {
      const _arr = []
      const _objectKeys = Object.keys(days)
      for (let objectKey of _objectKeys) {
        const startHour = this.hourConverter(days[objectKey].godzina_rozpoczęcia)
        const stopHour = this.hourConverter(days[objectKey].godzina_zakończenia).minus({minutes: days[objectKey]['przerwa']})
        const hourSum = stopHour.diff(startHour, ['minutes', 'hours'])
        days[objectKey]['suma'] = `${hourSum.hours}:${hourSum.minutes}`
        _arr.push(days[objectKey])
      }
      return _arr
    },
    hourConverter (hour) {
      return DateTime.fromISO('2020-02-01T' + hour + ':00.775+01:00')
    },
    async fetchData () {
      const previousMonth = DateTime.local().minus({month: 1}).monthLong
      const actualMonth = DateTime.local().monthLong
      const _monthsArr = [ previousMonth, actualMonth ]
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
