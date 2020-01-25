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
            {{ old_password }}
            <b-button
              :disabled="!validated"
              variant="success"
              @click="changePassword()"
              >
              Zmień
            </b-button>
          </b-col>
        </b-row>
      </b-card>
  </b-container>
</template>

<script>
import firebase from 'firebase'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import { mapMutations } from 'vuex'

export default {
  name: 'P-Settings',
  mixins: [validationMixin],
  data: () => ({
    fields: [
      {
        prepend: 'Aktualne Hasło',
        value: 'old_password',
        error: 'Minimum 6 znaków'
      },
      {
        prepend: 'Nowe Hasło',
        value: 'password',
        error: 'Minimum 6 znaków'
      },
      {
        prepend: 'Powtórz nowe hasło',
        value: 'retyped_password',
        error: 'Hasła muszą być identyczne'
      }
    ],
    old_password: null,
    password: null,
    retyped_password: null,
    validated: false
  }),
  validations: {
    old_password: {
      required,
      minLength: minLength(6),
      validate (value) {
        return new Promise((resolve, reject) => {
          if (typeof value === 'string' && value.length >= 6) {
            this.validated = true
            resolve(typeof value === 'string' && value.length >= 6)
          } else {
            this.validated = false
            reject(new Error())
          }
        })
      }
    },
    password: {
      required,
      minLength: minLength(6)
    },
    retyped_password: {
      required,
      minLength: minLength(6),
      isSame (value) {
        return new Promise((resolve, reject) => {
          if (value === this.password && value.length >= 6) {
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
    ...mapMutations('alert', ['setAlert']),
    validation (name) {
      const { $dirty, $error } = this.$v[name]
      return $dirty ? !$error : null
    },
    changePassword () {
      const user = firebase.auth().currentUser
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        this.old_password
      )

      user.reauthenticateWithCredential(credential).then(() => {
        user.updatePassword(this.password).then(() => {
          this.setAlert({
            message: 'Zmieniono Haso',
            variant: 'success',
            duration: 2
          })
        }).catch(error => {
          this.setAlert({
            message: 'Błąd przy zmianie hasła ' + error,
            variant: 'danger',
            duration: 2
          })
        })
      }).catch(error => {
        this.setAlert({
          message: 'Błąd przy zmianie hasła ' + error,
          variant: 'danger',
          duration: 2
        })
      })
    }
  }
}
</script>
