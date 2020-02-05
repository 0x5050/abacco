<template>
  <b-container class="pt-5">
    <b-card
      v-for="month in getCalendar.months"
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
import { DateTime } from 'luxon'
import { mapGetters, mapActions } from 'vuex'
import { prepareDates } from '@/backend/monthTableConverter'

export default {
  name: 'P-E-Calendar-Display',
  data: () => ({
    months: [],
    fields: ['data', 'godzina_rozpoczęcia', 'godzina_zakończenia', 'przerwa', 'suma', 'opis']
  }),
  computed: {
    ...mapGetters('user', ['getUserData']),
    ...mapGetters('employee/calendarDisplay', ['getCalendar'])
  },
  async created () {
    this.fetchData()
  },
  methods: {
    ...mapActions('employee/calendarDisplay', ['fetchData']),
    prepareDate (days) {
      return prepareDates(days)
    },
    hourConverter (hour) {
      return DateTime.fromISO('2020-02-01T' + hour + ':00.775+01:00')
    }
  }
}
</script>
