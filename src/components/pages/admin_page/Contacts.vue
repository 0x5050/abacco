<template>
  <b-container>
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
      <p>Ulica {{ contact.street }}</p>
      <p>{{ contact.zip }} {{ contact.city }}</p>
      <p>Nip: {{ contact.nip }}</p>

      <b-button
        variant="warning"
        @click="editContact(contact.nip)"
      >
        Edytuj
      </b-button>
    </b-card>

    <b-modal ref="editContactModal">
      {{ $data._editContact }}
    </b-modal>

    {{ getContact('1234123123312') }}

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
    ...mapActions('contacts', ['sendContact']),
    editContact (id) {
      this.$data._editContact = this.getContact(id)
      this.$refs['editContactModal'].show()
    }
  }
}
</script>
