<template>
  <b-container class="pt-5">
    <b-input-group prepend="Rok" size="lg">
      <b-select @change="fetchData" :options="options" v-model="year"/>
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

export default {
  name: 'P-E-Calendar-Display',
  data: () => ({
    uid: '',
    months: [],
    year: new Date().getFullYear().toString(),
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
      this.months = []
      await firebase.firestore()
        .collection('employee-hours')
        .doc(this.uid)
        .collection(this.year.toString())
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.months.push({[doc.id]: doc.data()})
          })
        })
    }
  }
}
</script>
