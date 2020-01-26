<template>
  <b-container class="pt-5">
    <b-card class="text-left font-weight-bolder ml-auto mr-auto">
      <b-form-group
        v-for="(input, index) in inputs"
        :key="input.prepend"
        :label="input.prepend"
        class="mt-2 b-row w-75 ml-auto mr-auto"
      >
        <Datetime
          :input-id="`input-${index}`"
          input-class="form-control"
          :type="input.type"
          :title="input.title"
          :minute-step="10"
          :min-datetime="minDate"
          @input="setField({fieldName: input.fieldName, value: $event})"
          :value="addDate[input.fieldName].toString()"
        />
      </b-form-group >
      <b-form-group label="Opis" class="w-75 ml-auto mr-auto">
        <b-form-textarea
          rows="3"
          max-rows="6"
          @input="setField({fieldName: 'description', value: $event})"
        />
        <b-button
          class="mt-3"
          variant="success"
          size="md"
          @click="sendData()"
        >
          Zapisz
        </b-button>
      </b-form-group>
    </b-card>
  </b-container>
</template>

<script>
import { Datetime } from 'vue-datetime'
import { DateTime } from 'luxon'
import { mapGetters, mapMutations } from 'vuex'
import firebase from 'firebase'

export default {
  name: 'P-E-Work-Hours',
  components: {
    Datetime
  },
  data: () => ({
    todayDate: new Date().toISOString(),
    minDate: '2020-01-01T00:00:00.000Z',
    inputs: [
      {
        type: 'date',
        prepend: 'Data',
        fieldName: 'date'
      },
      {
        type: 'time',
        prepend: 'Godzna rozpoczęcia pracy',
        title: 'Godzina rozpoczęcia',
        fieldName: 'start'
      },
      {
        type: 'time',
        prepend: 'Godzina zakończenia pracy',
        title: 'Godzina zakończenia',
        fieldName: 'stop'
      }
    ]
  }),
  computed: {
    ...mapGetters('employeehours', ['addDate'])
  },
  methods: {
    ...mapMutations('employeehours', ['setField']),
    ...mapMutations('alert', ['setAlert']),
    async sendData () {
      let uid
      await firebase.auth().onAuthStateChanged((user) => {
        uid = user.uid
      })
      const date = DateTime.fromISO(this.addDate.date)
      const fullDate = date.toFormat('yyyy-LL-dd')

      const obj = {}

      obj[fullDate] = this.addDate

      await firebase.firestore()
        .collection('employee-hours')
        .doc(uid)
        .collection(date.year.toString())
        .doc(date.monthLong)
        .set(obj, {merge: true})
      this.setAlert({
        message: 'Zapisano',
        variant: 'success',
        duration: 2
      })
    }
  }
}
</script>
