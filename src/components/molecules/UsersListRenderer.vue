<template>
  <b-container>
      <b-list-group-item v-for="(user, index) of usersList" :key="user.id">
          <b-form-radio-group v-model="data[index]">
            <b-row class="text-left">
                <b-col cols="4" class="text-left h3">
                  {{ user.email }}
                </b-col>
                <b-col
                  v-for="option in options"
                  :key="option.name"
                  :lg="option.cols"
                >
                  <b-form-radio :value="{value: true, id: user.id}" class="h5 mt-1">
                      {{ option.name }}
                  </b-form-radio>
                </b-col>
            </b-row>
          </b-form-radio-group>
      </b-list-group-item>
  </b-container>
</template>

<script>

export default {
  name: 'M-Users-List-Renderer',
  props: {
    data: { type: Array, default: () => [] },
    usersList: { type: Array, default: () => [] }
  },
  data: () => ({
    options: [
      {
        cols: '3',
        name: 'Administrator'
      },
      {
        cols: '2',
        name: 'Pracownik'
      },
      {
        cols: '3',
        name: 'Wyłączone'
      }
    ]
  })
}
</script>
