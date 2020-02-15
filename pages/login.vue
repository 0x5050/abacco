<template>
  <div class="h-100">
    <client-only placeholder="Loading..." placeholder-tag="span">
      <b-form
        v-if="!isLoggedIn"
        class="fluid-container my-auto"
      >
        <div class="row justify-content-center my-2 mx-0">
          <b-form-input
            id="email"
            v-model="formData.email"
            type="email"
            required
            placeholder="Enter email"
            class="col-10 col-sm-6 col-md-4 col-lg-3 col-xl-2"
          />
        </div>
        <div class="row justify-content-center my-2 mx-0">
          <b-form-input
            id="password"
            v-model="formData.password"
            type="password"
            required
            placeholder="Enter password"
            class="col-10 col-sm-6 col-md-4 col-lg-3 col-xl-2"
          />
        </div>
        <div class="row justify-content-center my-2 mx-0">
          <b-button
            variant="outline-primary"
            class="col-5 col-sm-3 col-md-2 col-lg-1 col-xl-1 mr-1"
            @click="createUser"
          >
            Sign up
          </b-button>
          <b-button
            variant="primary"
            class="col-5 col-sm-3 col-md-2 col-lg-2 col-xl-1 ml-1"
            @click="signInUser"
          >
            Sign in
          </b-button>
        </div>
      </b-form>
      <b-button
        v-else
        variant="outline-primary"
        @click="logout"
      >
        Logout
      </b-button>
    </client-only>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PLogin',
  data () {
    return {
      formData: {
        email: '',
        password: ''
      },
      error: ''
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'firebase/auth/isLoggedIn'
    })
  },
  methods: {
    ...mapActions({
      logoutUser: 'firebase/auth/logoutUser'
    }),
    async createUser () {
      try {
        await this.$fireAuth.createUserWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        )
      } catch (e) {
        alert(e)
      }
    },
    async signInUser () {
      try {
        await this.$fireAuth.signInWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        )
        this.formData.password = ''
      } catch (e) {
        alert(e)
      }
    },
    async logout () {
      try {
        await this.logoutUser()
      } catch (e) {
        this.error = e
      }
    }
  }
}
</script>

<style>
  .client-only-placeholder {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    width: 200px;
    height: 100px;
    font-size: 32px;
    margin: auto;
  }
</style>
