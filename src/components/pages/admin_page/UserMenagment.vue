<template>
    <b-container fluid>
      <b-row>
        <list-renderer
          :data="data"
          :users-list="usersList"
        />
      </b-row>
      <b-row class="mt-5">
        <b-col class=" float-right">
          <b-button @click="Save" class="w-25 mr-1">Zapisz</b-button>
        </b-col>
        <b-col>
          <b-button class="w-25 ml-1">Resetuj</b-button>
        </b-col>
      </b-row>
      <!-- <b-button @click="Signout">Wyloguj</b-button> -->
    </b-container>
</template>

<script>
import ListRenderer from '@/components/pages/admin_page/users/ListRenderer'
import firebase from 'firebase'

export default {
  name: 'user-menagment',
  components: {
    ListRenderer
  },
  data: () => ({
    data: [],
    usersList: []
  }),
  created () {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user
    })
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
    Signout () {
      firebase.auth().signOut()
        .then(user => {
          this.$router.push('/login')
        })
    },

    Save () {
      this.data.forEach(user => {
        let permission
        if (user.value === true) permission = 'admin'
        else if (user.value === false) permission = 'employee'
        else permission = 'error'
        this.ChangeRole(user.id, permission)
      })
    },

    ChangeRole (uid, event) {
      const addMessage = firebase.functions().httpsCallable('setUserRole')
      const data = { uid: uid, role: { [event]: true } }
      const userIndex = this.usersList.findIndex(user => user.id === uid)
      const _userName = this.usersList[userIndex].email
      addMessage(data)
        .then(function (result) {
          console.log(result)
          console.log('Zapisano', _userName)
        })
        .catch(function (error) {
          console.log(error)
        })
    }

  }
}
</script>
