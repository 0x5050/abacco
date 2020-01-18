<template>
  <b-container>
      <b-list-group-item v-for="(user, index) of usersList" :key="user.id">
          <b-form-radio-group v-model="data[index]">
            <b-form-row>
                <b-col cols="6" class="text-left h3">
                  {{ user.email }}
                </b-col>

                <b-col md="3">
                  <b-form-radio :value="{value: true, id: user.id}" class="h5">
                      Administrator
                  </b-form-radio>
                </b-col>
                <b-col md="3">
                  <b-form-radio :value="{value: false, id: user.id}" class="h5">
                     Pracownik
                  </b-form-radio>
                </b-col>
            </b-form-row>
          </b-form-radio-group>
      </b-list-group-item>
  </b-container>
</template>
<script>
export default {
  props: {
    data: { type: Array, default: () => [] },
    usersList: { type: Array, default: () => [] }
  }
}
</script>
