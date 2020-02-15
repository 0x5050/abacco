<template>
  <b-container class="pt-5">
    <b-input-group prepend="Użytkownik" size="lg">
      <b-select
        :options="getUserList"
        v-model="select"
        @change="fetchUserMonths()"
      />
    </b-input-group>

    <b-input-group prepend="Rok" size="lg" class="mt-1">
      <b-select @change="fetchUserMonths()" :options="years" v-model="year"/>
    </b-input-group>

    <b-card
      v-for="month in getUserMonths"
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
            :items="prepareData(days)"
          >
            <template v-slot:cell(zweryfikowane)="row">
              <b-select
                :options="options"
                v-model="row.item._rowVariant"
                @input="setDayStatus({item: row.item, month, value: $event})"
              />
            </template>
          </b-table>
          <span class="ml-auto">
            Suma przepracowanych godziń w miesiącu {{ Object.keys(month).shift() }} {{ monthlySum }}
          </span>
        </span>
      </b-collapse>
    </b-card >
  </b-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { prepareDates } from '@/backend/monthTableConverter'

export default {
  name: 'T-Employee-Hours',
  data: () => ({
    year: new Date().getFullYear().toString(),
    years: [],
    fields: [
      'data',
      'godzina_rozpoczęcia',
      'godzina_zakończenia',
      'przerwa',
      'suma',
      'opis',
      'zweryfikowane'
    ],
    options: [
      {
        text: 'Brak',
        value: ''
      },
      {
        text: 'Zweryfikowane',
        value: 'success'
      },
      {
        text: 'Odrzucone',
        value: 'danger'
      },
      {
        text: 'Uwaga',
        value: 'warning'
      }
    ],
    monthlySum: ''
  }),
  computed: {
    ...mapGetters('admin/employeeWorkHours', [
      'selectedUser',
      'getUserList',
      'getUserMonths'
    ]),
    select: {
      get () {
        return this.getUserList
      },
      set (value) {
        this.setUser(value)
      }
    }
  },
  mounted () {
    const minYear = 2020
    let _year = new Date().getFullYear()
    for (_year; _year >= minYear; _year--) {
      this.years.push({value: _year.toString(), text: _year.toString()})
    }
    this.mapUsers()
    this.fetchUserMonths()
  },
  methods: {
    ...mapMutations('admin/employeeWorkHours', ['setUser']),
    ...mapActions('admin/employeeWorkHours', [
      'mapUsers',
      'fetchUserMonths',
      'setDayStatus'
    ]),
    prepareData (days) {
      const monthlyHoursSum = prepareDates(days).monthlyHoursSum
      this.monthlySum = `${monthlyHoursSum.hours}:${monthlyHoursSum.minutes}`
      return prepareDates(days).monthArr
    }
  }
}
</script>
