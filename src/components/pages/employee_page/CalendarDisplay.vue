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
          <span class="ml-auto">
            Suma przepracowanych godziń w miesiącu {{ Object.keys(month).shift() }} {{ monthlySum }}
          </span>
        </span>
      </b-collapse>
    </b-card >
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { prepareDates } from '@/backend/monthTableConverter'

export default {
  name: 'P-E-Calendar-Display',
  data: () => ({
    months: [],
    monthlySum: '',
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
      const monthlyHoursSum = prepareDates(days).monthlyHoursSum
      this.monthlySum = `${monthlyHoursSum.hours}:${monthlyHoursSum.minutes}`
      return prepareDates(days).monthArr
    }
  }
}
</script>
