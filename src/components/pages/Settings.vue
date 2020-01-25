<template>
  <b-container class="pt-5">
      <b-card title="Zmień hasło" class="text-left">
        <b-row
          v-for="field in fields"
          :key="field.prepend"
        >
          <b-col>
            <b-input-group
              :prepend="field.prepend"
              class="mt-2"
            >
              <b-input
                :state="validation(field.value)"
                type="password"
                v-model="$v[field.value].$model"
              />
              <b-form-invalid-feedback>
                  {{ field.error }}
              </b-form-invalid-feedback>
            </b-input-group>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col>
            <b-button
              :disabled="!validated"
              variant="success">
              Zmień
            </b-button>
          </b-col>
        </b-row>
      </b-card>
  </b-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'P-Settings',
  mixins: [validationMixin],
  data: () => ({
    fields: [
      {
        prepend: 'Hasło',
        value: 'password',
        error: 'Pole Wymagane'
      },
      {
        prepend: 'Powtórz hasło',
        value: 'retyped_password',
        error: 'Hasła muszą być identyczne'
      }
    ],
    password: null,
    retyped_password: null,
    validated: false
  }),
  validations: {
    password: {
      required
    },
    retyped_password: {
      required,
      isSame (value) {
        return new Promise((resolve, reject) => {
          if (value === this.password) {
            this.validated = true
            resolve(value === this.password && typeof value === 'string')
          } else {
            this.validated = false
            reject(new Error('Passwords do not match'))
          }
        })
      }
    }
  },
  methods: {
    validation (name) {
      const { $dirty, $error } = this.$v[name]
      return $dirty ? !$error : null
    }
  }
}
</script>
