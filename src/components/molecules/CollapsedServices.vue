<template>
  <div>
    <b-button
      v-b-toggle="categorie.service"
      size="lg"
      class="mt-4 w-75 text-left button"
    >
       {{ categorie.service }}
    </b-button>
    <b-collapse
      :id="categorie.service"
      class="w-75 mr-auto ml-auto mt-1"
    >
      <b-card
        bg-variant="light"
        text-variant="dark"
        class="text-left w-75"
      >
        <b-list-group>
          <b-list-group-item
            v-for="option in categorie.options"
            :key="option"
            variant="secondary"
          >
            {{ option }}
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: 'collapsed-services',
  props: {
    categorie: { type: Object, default: () => {} }
  }
}
</script>

<style scoped>
.button {
  font-size: 2em;
}
</style>
