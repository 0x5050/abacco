<template>
    <div>
        {{ items_count }}
        {{ items }}
        data: <b-input v-model="date"/> <br>
        Wartość: <b-input v-model="worth"/> <br>
        Nr Faktury: <b-input v-model="invoice_number"/> <br>
        Przedmioty <button @click="addItem">Dodaj</button><br>
        <div v-for="item in items_count" :key="item">
            {{ item }}
            Nazwa: <b-input @input="itemInput(item, 'name', $event)"/> <br>
            Ilość: <b-input @input="itemInput(item, 'count', $event)"/> <br>
            Cena: <b-input @input="itemInput(item, 'price', $event)"/> <br>
        </div>
        <b-button @click="test">Zapisz</b-button>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'P-A-Invoices-Menagment',
  data: () => ({
    date: '',
    worth: '',
    invoice_number: '',
    items_count: 1,
    items: [
      {
        name: '',
        count: '',
        price: ''
      }
    ]
  }),
  methods: {

    itemInput (index, value, event) {
      console.log('input', index, value, event)
      this.items[index - 1][value] = event
    },

    addItem () {
      this.items_count++
      this.items.push({name: '', count: '', price: ''})
    },

    test () {
      console.log(firebase.firestore().collection('test').get().then(snap => console.log(snap)))
      console.log('test')
      firebase.firestore()
        .collection('test')
        .doc('123')
        .set({
          date: '12.12.2020',
          value: 120,
          invoice_number: 'FA01/12-23/1',
          items: [
            {
              name: 'Wiertarka',
              vat_rate: 23,
              price: 100,
              count: 1
            },
            {
              name: 'Śrubokręty',
              vat_rate: 23,
              price: 20,
              count: 1
            }
          ]
        })
    },
    async getMarker () {
      const snapshot = await firebase.firestore().collection('test').get()
      console.log(snapshot.docs.map(doc => doc.data()))
    }
  }
}
</script>
