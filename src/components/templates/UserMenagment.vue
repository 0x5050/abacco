<template>
    <b-container>
      <b-row>
        <b-col>
          <m-user-list-renderer
            class="mt-5"
            :data="data"
            :users-list="usersList"
          />
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col class="text-right mr-4">
          <b-button-group size="lg">
            <b-button
              variant="danger"
              class="mr-3"
              @click="Reset()"
            >
              Resetuj
            </b-button>
            <b-button
              variant="success"
              @click="Save()"
            >
              Zapisz
            </b-button>
          </b-button-group>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
import MUserListRenderer from '@/components/molecules/UsersListRenderer'
import firebase from 'firebase'
import { mapMutations } from 'vuex'

export default {
  name: 'T-User-Menagment',
  components: {
    MUserListRenderer
  },
  data: () => ({
    data: [],
    usersList: []
  }),
  created () {
    firebase.firestore().collection('roles').get()
      .then(snap => {
        snap.forEach(doc => {
          let user = doc.data()
          user.id = doc.id
          this.usersList.push(user)
          let permission = Object.keys(user.role).toString()
          if (permission === 'admin') permission = true
          else if (permission === 'employee') permission = false
          else permission = undefined
          this.data.push({value: permission, id: user.id})
        })
      })
  },
  methods: {
    ...mapMutations('alert', ['setAlert']),
    Save () {
      this.data.forEach(user => {
        let permission
        if (user.value === true) permission = 'admin'
        else if (user.value === false) permission = 'employee'
        else permission = 'error'
        this.ChangeRole(user.id, permission)
      })
    },

    Reset () {
      window.location.reload(true)
    },

    ChangeRole (uid, event) {
      const changeUserRole = firebase.functions().httpsCallable('setUserRole')
      const data = { uid: uid, role: { [event]: true } }
      const userIndex = this.usersList.findIndex(user => user.id === uid)
      const _userName = this.usersList[userIndex].email
      const self = this
      changeUserRole(data)
        .then(result => {
          self.setAlert({
            message: 'Zapisano ' + _userName,
            variant: 'success',
            duration: 2
          })
        })
        .catch(error => {
          self.setAlert({
            message: 'Błąd: ' + error,
            variant: 'danger',
            duration: 2
          })
        })
    }

  }
}
</script>
