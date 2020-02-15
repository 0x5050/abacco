<template>
  <b-card
    :title="title"
    class="text-left"
    :class="classFeature"
  >
    <b-row
      v-for="(input, iterator) in inputs"
      :key="input.prepend"
    >
      <b-col>
        <slot :name="`input-${iterator}`"/>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col>
        <slot name="button"/>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: 'M-Input-Card',
  props: {
    title: { type: String, default: '' },
    classFeature: { type: String, default: '' },
    inputs: { type: Array, required: true }
  }
}
</script>
