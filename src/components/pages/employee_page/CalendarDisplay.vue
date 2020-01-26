<template>
  <b-container class="pt-5">

    <div v-for="month in result" :key="Object.keys(month).toString()">
      {{ Object.keys(month) }}
      <div v-for="days in month" :key="Object.keys(days).toString()">
        <b-table
          :items="prepareData(days)"
        />
      </div>
    </div>

    <b-card
      v-for="month in data"
      :key="month.date"
      :title="getMonth(month)"
      class="text-left mt-1"
    >
    <b-button
      v-b-toggle="Object.keys(month).join()"
      variant="info"
      @click="test"
    >
      Rozwiń
    </b-button>
      <b-collapse :id="Object.keys(month).join()">
        <span
          v-for="day in month"
          :key="day.date"
        >
          <b-row class="mt-2">
            <b-col
              v-for="field in fields"
              :key="field.prepend"
              lg
            >
              <b-input-group :prepend="field.prepend">
                <b-input disabled :value="dateFormat(day[field.value], field.format)"/>
              </b-input-group>
            </b-col>
            <b-col lg>
              <b-input-group prepend="Opis">
                <b-input disabled :value="day.description"/>
              </b-input-group>
            </b-col>
          </b-row>
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
    data: [],
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
    ],
    result: [],
    table: []
  }),
  mounted () {
    console.log('result', this.result)
  },
  methods: {
    prepareData (obj) {
      let arr = []
      console.log(obj)
      const o = Object.keys(obj)
      for (let i of o) {
        console.log(i)
        arr.push(obj[i])
      }
      console.log(arr)
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
    await firebase.firestore().collection('employee-hours').doc(this.uid).collection('2020').get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.id, ' => ', doc.data())
          this.result.push({[doc.id]: doc.data()})
        })
      })
  }
}
</script>
