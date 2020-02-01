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
          :minute-step="30"
          :min-datetime="minDate"
          :max-datetime="todayDate"
          @input="setField({fieldName: input.fieldName, value: $event})"
          :value="addDate[input.fieldName].toString()"
        />
      </b-form-group >
      <b-form-group label="Opis" class="w-75 ml-auto mr-auto">
        <b-form-textarea
          rows="3"
          max-rows="6"
          @input="setField({fieldName: 'opis', value: $event})"
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
    minDate: DateTime.local().minus({days: 1}).toString(),
    inputs: [
      {
        type: 'date',
        prepend: 'Data',
        fieldName: 'data'
      },
      {
        type: 'time',
        prepend: 'Godzna rozpoczęcia pracy',
        title: 'Godzina rozpoczęcia',
        fieldName: 'godzina_rozpoczęcia'
      },
      {
        type: 'time',
        prepend: 'Godzina zakończenia pracy',
        title: 'Godzina zakończenia',
        fieldName: 'godzina_zakończenia'
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

      const fullDate = DateTime.fromISO(this.addDate.data)
      const result = {}

      result[this.addDate.data] = {
        data: DateTime.fromISO(this.addDate.data).toFormat('D'),
        godzina_rozpoczęcia: DateTime.fromISO(this.addDate.godzina_rozpoczęcia).toFormat('T'),
        godzina_zakończenia: DateTime.fromISO(this.addDate.godzina_zakończenia).toFormat('T'),
        opis: this.addDate.opis,
        zweryfikowane: false
      }

      await firebase.firestore()
        .collection('employee-hours')
        .doc(uid)
        .collection(fullDate.year.toString())
        .doc(fullDate.monthLong)
        .set(result, {merge: true})
      this.setAlert({
        message: 'Zapisano',
        variant: 'success',
        duration: 2
      })
    }
  }
}
</script>
