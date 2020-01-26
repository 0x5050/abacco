<template>
  <b-container class="pt-5">
    <b-card
      v-for="(month, index) in years"
      :key="month.id"
      :title="month.email"
      :sub-title="`${getMonth(Number(month.month))} ${month.year}`"
      class="text-left mt-1"
      v-b-toggle="month.id"
    >
    <b-collapse :id="month.id">
      <b-card>
        <span v-for="(day, date) in month.data" :key="day.value" class="mt-1">
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
            <b-col lg class="d-flex">
              <span class="mt-1">Zweryfikowane:</span>
              <b-checkbox
                class="ml-1"
                size="lg"
                @change="verifyHour(month, day)"
                :value="true"
                :unchecked-value="false"
                v-model="employeeHoursArr[index].data[date].verified"
              />
            </b-col>
          </b-row>
        </span>
      </b-card>
    </b-collapse>
    </b-card>
  </b-container>
</template>

<script>
import { DateTime } from 'luxon'
import firebase from 'firebase'

export default {
  name: 'T-Employee-Hours',
  data: () => ({
    years: [],
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
    employeeHoursArr: []
  }),
  async created () {
    const firestore = firebase.firestore()
    const users = await firestore.collection('roles').get()
    const employeeHours = await firestore.collection('employee-hours').get()
    const _usersArr = []

    users.docs.map(doc => {
      _usersArr.push({
        email: doc.data().email,
        uid: doc.id
      })
    })

    employeeHours.docs.map(doc => {
      const documentID = doc.id
      this.employeeHoursArr.push({
        uid: documentID.slice(0, 28),
        month: documentID.slice(29, 31),
        year: documentID.slice(32, 37),
        data: doc.data(),
        email: ''
      })
    })

    let id = 0

    _usersArr.forEach(user => {
      this.employeeHoursArr.forEach(hour => {
        if (hour.uid === user.uid) {
          this.years.push({
            email: user.email,
            uid: user.uid,
            month: hour.month,
            year: hour.year,
            data: hour.data,
            id: id.toString()
          })
          id++
        }
      })
    })
  },
  methods: {
    async verifyHour (month, day) {
      const _fullDate = DateTime.fromISO(day.date).toFormat('yyyy-LL-dd')
      const _obj = {}

      day.verified = !day.verified
      _obj[_fullDate] = day

      await firebase.firestore()
        .collection('employee-hours')
        .doc(`${month.uid}-${month.month}-${month.year}`)
        .set(_obj, {merge: true})
    },
    dateFormat (value, type) {
      return DateTime.fromISO(value).toFormat(type)
    },
    getMonth (item) {
      const date = DateTime.fromObject({month: item})
      return date.monthLong.charAt(0).toUpperCase() + date.monthLong.slice(1)
    }
  }
}
</script>
