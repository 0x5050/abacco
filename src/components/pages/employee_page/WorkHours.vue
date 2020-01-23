<template>
  <b-container class="pt-5">
    {{ add }}
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
            @input="setField({fieldName: input.fieldName, value: $event})"
          />
        </b-form-group >
        <b-form-group label="Opis" class="w-75 ml-auto mr-auto">
          <b-form-textarea
            rows="3"
            max-rows="6"
            @input="setField({fieldName: 'description', value: $event})"
          />
        </b-form-group>
      </b-card>
  </b-container>
</template>

<script>
import { Datetime } from 'vue-datetime'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'P-E-Work-Hours',
  components: {
    Datetime
  },
  data: () => ({
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
    ...mapGetters('employeehours', ['add'])
  },
  methods: {
    ...mapMutations('employeehours', ['setField'])
  }
}
</script>
