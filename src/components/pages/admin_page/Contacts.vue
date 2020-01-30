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
    {{ contact }}
  </b-container>
</template>

<script>
import MInputCard from '@/components/molecules/InputCard'
import { mapMutations, mapActions } from 'vuex'

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
    ]
  }),
  methods: {
    ...mapMutations('contacts', ['setContact']),
    ...mapActions('contacts', ['sendContact'])
  }
}
</script>
