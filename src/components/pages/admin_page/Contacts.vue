<template>
  <b-container class="pt-5">
    <m-input-card
      title="Dodaj kontrahenta"
      :inputs="contactInputs"
    >
      <b-input-group
        v-for="(input, iterator) in contactInputs"
        :key="input.prepend"
        :slot="`input-${iterator}`"
        :prepend="input.prepend"
        class="mt-2"
      >
        <b-input
          :type="input.type"
          @input="setContact({fieldName: input.name, value: $event})"
        />
      </b-input-group>
      <b-button
        slot="button"
        variant="success"
        @click="sendContact()"
      >
        Zapisz
      </b-button>
    </m-input-card>

    <b-card
      v-for="contact in getAllContacts"
      :key="contact.nip"
      :title="contact.name"
      class="text-left mt-2"
    >
      <b-card-text>
        Adres: {{ contact.street }} <br>
        {{ contact.zip }} {{ contact.city }} <br>
        NIP: {{ contact.nip }}
      </b-card-text>

      <template slot="footer">
        <b-button
          variant="warning"
          @click="editContact(contact.nip)"
        >
          Edytuj
        </b-button>

        <b-button
          variant="danger"
          @click="deleteContat({id: contact.nip})"
        >
          Usuń
        </b-button>
      </template>
    </b-card>

    <b-modal
      ref="editContactModal"
      title="Edytuj"
    >
      Nazwa: <b-input v-model="$data._editContact.name"/>
      Ulica: <b-input v-model="$data._editContact.street"/>
      Kod pocztowy: <b-input v-model="$data._editContact.zip"/>
      Miasto: <b-input v-model="$data._editContact.city"/>
      <template slot="modal-footer">
        <b-button @click="saveEditedContact($data._editContact)">
          Zapsiz
        </b-button>
        <b-button @click="cancelEdit()">
          Anuluj
        </b-button>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
import MInputCard from '@/components/molecules/InputCard'
import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'P-A-Contacts',
  components: {
    MInputCard
  },
  data: () => ({
    contactInputs: [
      {
        prepend: 'Nazwa',
        type: 'text',
        name: 'name'
      },
      {
        prepend: 'Ulica',
        type: 'text',
        name: 'street'
      },
      {
        prepend: 'Kod Pocztowy',
        type: 'text',
        name: 'zip'
      },
      {
        prepend: 'Miasto',
        type: 'text',
        name: 'city'
      },
      {
        prepend: 'NIP',
        type: 'number',
        name: 'nip'
      }
    ],
    _editContact: {}
  }),
  computed: {
    ...mapGetters('contacts', ['getAllContacts', 'getContact'])
  },
  created () {
    this.getContacts()
  },
  methods: {
    ...mapMutations('contacts', ['setContact', 'getContacts']),
    ...mapActions('contacts', ['sendContact', 'sendEditedContact', 'deleteContat']),
    editContact (id) {
      this.$data._editContact = this.getContact(id)
      this.$refs['editContactModal'].show()
    },
    saveEditedContact (contact) {
      this.sendEditedContact(contact)
      this.$refs['editContactModal'].hide()
    },
    cancelEdit () {
      this.getContacts()
      this.$refs['editContactModal'].hide()
    }
  }
}
</script>
