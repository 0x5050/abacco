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
          type="password"
          @input="setPasswordField({fieldName: input.value, value: $event})"
        />
      </b-input-group>

      <b-button
        slot="button"
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
        @click="sendPersonalData(uid)"
        >
        Zapisz
      </b-button>
    </m-input-card>
  </b-container>
</template>

<script>
import MInputCard from '@/components/molecules/InputCard'
import firebase from 'firebase'
import { validationMixin } from 'vuelidate'
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
    this.fetchData()
  },
  computed: {
    ...mapGetters('personaldata', ['getPersonalData'])
  },
  methods: {
    ...mapMutations('personaldata', ['setPersonalData', 'savePersonalData']),
    ...mapMutations('settings', ['setPasswordField']),
    ...mapActions('personaldata', ['sendPersonalData', 'fetchData']),
    ...mapActions('settings', ['changePassword'])
  }
}
</script>
