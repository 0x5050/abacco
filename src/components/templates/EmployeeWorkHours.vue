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
            :items="prepareDate(days)"
          >
            <template v-slot:cell(zweryfikowane)="row">
              <b-select
                :options="options"
                v-model="row.item._rowVariant"
                @input="setDayStatus({item: row.item, month, value: $event})"
              />
            </template>
          </b-table>
        </span>
      </b-collapse>
    </b-card >
  </b-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'T-Employee-Hours',
  data: () => ({
    year: new Date().getFullYear().toString(),
    years: [],
    fields: [
      'data',
      'godzina_rozpoczęcia',
      'godzina_zakończenia',
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
    ]
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
    prepareDate (days) {
      const _arr = []
      const _objectKeys = Object.keys(days)
      for (let objectKey of _objectKeys) {
        _arr.push(days[objectKey])
      }
      return _arr
    }
  }
}
</script>
