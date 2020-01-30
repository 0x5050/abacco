<template>
  <b-container class="pt-5">
    <m-input-card
      title="Zmień hasło"
      :inputs="passwordFields"
    >
      <b-input-group
        v-for="(input, iterator) in passwordFields"
        :key="input.preprend"
        :slot="`input-${iterator}`"
        :prepend="input.prepend"
        class="mt-2"
      >
        <b-input
          :state="validation(input.value)"
          type="password"
          v-model="$v[input.value].$model"
        />
        <b-form-invalid-feedback>
          {{ input.error }}
        </b-form-invalid-feedback>
      </b-input-group>

      <b-button
        slot="button"
        :disabled="!validated"
        variant="success"
        @click="changePassword()"
        >
        Zmień
      </b-button>
    </m-input-card>
    <m-input-card
      title="Dane osobowe"
      class="mt-2"
      :inputs="personalDataFields"
    >
      <b-input-group
        v-for="(input, iterator) in personalDataFields"
        :key="input.preprend"
        :slot="`input-${iterator}`"
        :prepend="input.prepend"
        class="mt-2"
      >
        <b-input
          :type="input.type"
          :value="getPersonalData[input.value]"
          @input="setPersonalData({fieldName: input.value, value: $event})"
        />
      </b-input-group>

      <b-button
        slot="button"
        variant="success"
        @click="savePersonalDataDB(uid)"
        >
        Zapisz
      </b-button>
    </m-input-card>
          {{ getPersonalData }}
          {{ uid }}
  </b-container>
</template>

<script>
import MInputCard from '@/components/molecules/InputCard'
import firebase from 'firebase'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'P-Settings',
  components: {
    MInputCard
  },
  mixins: [validationMixin],
  data: () => ({
    uid: firebase.auth().currentUser.uid,
    passwordFields: [
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
    validated: false,

    personalDataFields: [
      {
        prepend: 'Imię',
        value: 'name',
        type: 'text'
      },
      {
        prepend: 'Nazwisko',
        value: 'surname',
        type: 'text'
      },
      {
        prepend: 'Numer telefonu',
        value: 'phone',
        type: 'number'
      }
    ]
  }),
  mounted () {
    firebase.firestore()
      .collection('users')
      .doc(this.uid)
      .get()
      .then(documentSnapshot => {
        const data = documentSnapshot.data()
        const fieldsNames = Object.keys(documentSnapshot.data())
        for (const fieldName of fieldsNames) {
          this.setPersonalData({fieldName: fieldName, value: data[fieldName]})
        }
      })
  },
  computed: {
    ...mapGetters('personaldata', ['getPersonalData'])
  },
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
            reject(Error('Validation'))
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
    ...mapMutations('personaldata', ['setPersonalData', 'savePersonalData']),
    ...mapActions('personaldata', ['savePersonalDataDB']),
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
