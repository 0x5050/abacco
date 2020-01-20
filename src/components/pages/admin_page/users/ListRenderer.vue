<template>
  <b-container>
      <b-list-group-item v-for="(user, index) of usersList" :key="user.id">
          <b-form-radio-group v-model="data[index]">
            <b-row class="text-left">
                <b-col cols="4" class="text-left h3">
                  {{ user.email }}
                </b-col>

                <b-col lg="3">
                  <b-form-radio :value="{value: true, id: user.id}" class="h4 mt-1">
                      Administrator
                  </b-form-radio>
                </b-col>
                <b-col lg="2">
                  <b-form-radio :value="{value: false, id: user.id}" class="h4 mt-1">
                     Pracownik
                  </b-form-radio>
                </b-col>
                <b-col lg="3">
                  <b-form-radio :value="{value: undefined, id: user.id}" class="h4 mt-1">
                     Wyłączone
                  </b-form-radio>
                </b-col>
            </b-row>
          </b-form-radio-group>
      </b-list-group-item>
  </b-container>
</template>

<script>

export default {
  name: 'list-renderer',
  props: {
    data: { type: Array, default: () => [] },
    usersList: { type: Array, default: () => [] }
  }
}
</script>
