<template>
  <b-container class="pt-5">
    <b-card
      v-for="month in data"
      :key="month.date"
      :title="getMonth(month)"
      class="text-left mt-1"
      v-b-toggle="Object.keys(month).join()"
    >
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
    ]
  }),
  methods: {
    getMonth (item) {
      const firstDate = Object.keys(item)[0]
      const date = DateTime.fromISO(firstDate)
      let month = ''
      switch (date.month) {
        case 1:
          month = 'Styczeń'
          break
        case 2:
          month = 'Luty'
          break
        case 3:
          month = 'Marzec'
          break
        case 4:
          month = 'Kwiecień'
          break
        case 5:
          month = 'Maj'
          break
        case 6:
          month = 'Czerwiec'
          break
        case 7:
          month = 'Lipiec'
          break
        case 8:
          month = 'Sierpień'
          break
        case 9:
          month = 'Wrzesień'
          break
        case 10:
          month = 'Październik'
          break
        case 11:
          month = 'Listopad'
          break
        case 12:
          month = 'Grudzień'
          break
      }
      return `${month} ${date.year}`
    },
    dateFormat (value, type) {
      return DateTime.fromISO(value).toFormat(type)
    }
  },
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
