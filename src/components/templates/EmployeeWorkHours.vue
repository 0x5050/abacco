<template>
  <b-container class="pt-5">
    <b-input-group prepend="Użytkownik" size="lg">
      <b-select
        :options="userOptions"
        v-model="user"
        @change="fetchData()"
      />
    </b-input-group>

    <b-input-group prepend="Rok" size="lg" class="mt-1">
      <b-select @change="fetchData()" :options="years" v-model="year"/>
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
          >
            <template v-slot:cell(zweryfikowane)="row">
              <b-checkbox
                size="lg"
                @change="verifiedHour(row.item, month)"
                :value="true"
                :unchecked-value="false"
                v-model="row.item.zweryfikowane"
              />
            </template>
          </b-table>
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
    year: new Date().getFullYear().toString(),
    years: [],
    userOptions: [],
    user: '',
    months: [],
    fields: [
      'data',
      'godzina_rozpoczęcia',
      'godzina_zakończenia',
      'opis',
      'zweryfikowane'
    ]
  }),
  async created () {
    await firebase.auth().onAuthStateChanged(user => {
      this.user = user.uid
    })
    this.mapUsers()
    this.fetchData()
  },
  mounted () {
    const minYear = 2020
    let _year = new Date().getFullYear()
    for (_year; _year >= minYear; _year--) {
      this.years.push({value: _year.toString(), text: _year.toString()})
    }
  },
  methods: {
    verifiedHour (item, month) {
      const date = item.data
      const obj = {}
      obj[this.dateConverter(date)] = item
      obj[this.dateConverter(date)].zweryfikowane = !obj[this.dateConverter(date)].zweryfikowane

      firebase.firestore()
        .collection('employee-hours')
        .doc(this.user)
        .collection(this.year.toString())
        .doc(Object.keys(month).toString())
        .set(obj, {merge: true})
    },
    dateConverter (date) {
      const _number = date.split('.')
      const _date = new Date(parseInt(_number[2]), parseInt(_number[1]) - 1, parseInt(_number[0]))
      _date.setHours(1)
      return _date.toISOString()
    },
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
    },
    async mapUsers () {
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
    }
  }
}
</script>
