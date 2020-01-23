<template>
  <b-container class="pt-5">
      <b-card class="text-left font-weight-bolder ml-auto mr-auto">
        <b-form-group
          v-for="input in inputs"
          :key="input.prepend"
          :label="input.prepend"
          class="mt-2 b-row w-75 ml-auto mr-auto"
        >
          <Datetime
            input-class="form-control"
            :type="input.type"
            :title="input.title"
            :minute-step="10"
          />
        </b-form-group >
        <b-form-group label="Opis" class="w-75 ml-auto mr-auto">
          <b-form-textarea  rows="3" max-rows="6"/>
        </b-form-group>
      </b-card>
  </b-container>
</template>

<script>
import { Datetime } from 'vue-datetime'

export default {
  name: 'P-E-Work-Hours',
  components: {
    Datetime
  },
  data: () => ({
    inputs: [
      {
        type: 'date',
        prepend: 'Data'
      },
      {
        type: 'time',
        prepend: 'Godzna rozpoczęcia pracy',
        title: 'Godzina rozpoczęcia'
      },
      {
        type: 'time',
        prepend: 'Godzina zakończenia pracy',
        title: 'Godzina zakończenia'
      }
    ]
  })
}
</script>
