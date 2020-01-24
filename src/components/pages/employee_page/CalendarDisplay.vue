<template>
  <div>
    <b-card
      v-for="item in data"
      :key="item.date"
      :title="getMonth(item)"
      class="text-left mt-2"
      v-b-toggle="item"
    >
      <b-collapse :id="item">
        <span
          v-for="i in item"
          :key="i.date"
        >
          <b-row class="mt-2">
            <b-col
              v-for="field in fields"
              :key="field.prepend"
              lg
            >
              <b-input-group :prepend="field.prepend">
                <b-input disabled :value="dateFormat(i[field.value], field.format)"/>
              </b-input-group>
            </b-col>

          </b-row>
        </span>
      </b-collapse>
    </b-card >
  </div>
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
        prepend: 'Start',
        format: 'H',
        value: 'start'
      },
      {
        prepend: 'Stop',
        format: 'H',
        value: 'stop'
      },
      {
        prepend: 'Opis',
        value: 'description'
      }
    ]
  }),
  methods: {
    getMonth (item) {
      const firstDate = Object.keys(item)[0]
      const date = DateTime.fromISO(firstDate)
      return `${date.month}.${date.year}`
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
