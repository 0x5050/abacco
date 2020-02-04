<template>
<b-container fluid class="bg-dark h-100 position-fixed">
  <b-form
    class="ml-auto mr-auto center"
    @submit="LoginUser"
  >
  <b-row>
    <b-input-group
      v-for="input in inputs"
      :key="input.name"
      :prepend="input.name"
      class="mt-3"
      size="lg"
    >
      <b-input
        v-model="login_form[input.type]"
        :type="input.type"
      />
    </b-input-group>
  </b-row>
    <b-row>
      <b-button
        class="mt-3 d-block mr-auto"
        variant="info"
        v-b-modal="'register-modal'"
      >
        Zarejestruj
      </b-button>
      <b-button
        class="mt-3 d-block ml-auto"
        variant="success"
        type="submit"
      >
        Zaloguj
      </b-button>
    </b-row>
  </b-form>
  <b-modal id="register-modal" hide-footer title="Zarejestruj się">
    <b-input-group
      v-for="input in inputs"
      :key="input.name"
      :prepend="input.name"
      class="mt-3"
    >
      <b-input
        v-model="register_form[input.type]"
        :type="input.type"
      />
    </b-input-group>
    <b-button
        class="mt-3 d-block ml-auto"
        variant="success"
        @click="RegisterUser"
    >
        Zarejestruj
    </b-button>
  </b-modal>
</b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'P-Login',
  data: () => ({
    login_form: {
      email: '',
      password: ''
    },
    register_form: {
      email: '',
      password: ''
    },
    inputs: [
      {
        name: '✉️',
        type: 'email'
      },
      {
        name: '🔑',
        type: 'password'
      }
    ]
  }),
  computed: {
    ...mapGetters('user', ['getUserData'])
  },
  async mounted () {
    await this.setUserData()
    if (this.getUserData.role !== '') {
      this.$router.replace({path: `/${this.getUserData.role}`})
    }
  },
  methods: {
    ...mapActions('user', [
      'getUserUID',
      'getUserRole',
      'userLogin',
      'userRegister',
      'setUserData'
    ]),
    LoginUser () {
      this.userLogin({
        email: this.login_form.email,
        password: this.login_form.password
      }).then(setTimeout(() => {
        this.$router.push({path: `/${this.getUserData.role}`})
      }, 2000))
    },
    RegisterUser () {
      this.userRegister({
        email: this.register_form.email,
        password: this.register_form.password
      })
    }
  }
}
</script>

<style scoped>
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
