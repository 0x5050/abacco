<template>
  <b-container class="pt-5">
    <b-card class="text-left font-weight-bolder ml-auto mr-auto">
      <b-form-group
        v-for="(input, index) in employeeInputs"
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
          :max-datetime="input.maxDate"
          @input="setField({fieldName: input.fieldName, value: $event})"
          :value="addDate[input.fieldName].toString()"
        />
      </b-form-group >
      <b-form-group
        label="Łączny czas przerw"
        class="mt-2 b-row w-75 ml-auto mr-auto"
      >
        <b-select
          :options="breakOptions"
          v-model="addDate['przerwa']"
        />
      </b-form-group>
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
          @click="sendData(getUserData.user_id)"
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
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'P-E-Work-Hours',
  components: {
    Datetime
  },
  data: () => ({
    minDate: DateTime.local().minus({days: 1}).toString(),
    employeeInputs: [
      {
        type: 'date',
        prepend: 'Data',
        fieldName: 'data',
        maxDate: new Date().toISOString()
      },
      {
        type: 'time',
        prepend: 'Godzna rozpoczęcia pracy',
        title: 'Godzina rozpoczęcia',
        fieldName: 'godzina_rozpoczęcia',
        maxDate: ''
      },
      {
        type: 'time',
        prepend: 'Godzina zakończenia pracy',
        title: 'Godzina zakończenia',
        fieldName: 'godzina_zakończenia',
        maxDate: ''
      }
    ],
    breakOptions: [
      {text: '0 min', value: 0},
      {text: '15 min', value: 15},
      {text: '30 min', value: 30},
      {text: '45 min', value: 45},
      {text: '60 min', value: 60},
      {text: '75 min', value: 75},
      {text: '90 min', value: 90},
      {text: '105 min', value: 105},
      {text: '120 min', value: 120}
    ]
  }),
  computed: {
    ...mapGetters('employee/employeeHours', ['addDate']),
    ...mapGetters('user', ['getUserData'])
  },
  methods: {
    ...mapMutations('employee/employeeHours', ['setField']),
    ...mapMutations('alert', ['setAlert']),
    ...mapActions('employee/employeeHours', ['sendData'])
  }
}
</script>
