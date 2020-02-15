<template>
    <div>
      <div class="title">
        {{ title }}
      </div>
        <b-carousel
        :interval="5000"
        :no-touch="true"
        controls
        indicators
        background="#343a40"
        img-width="1024"
        img-height="480"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
        >
            <b-carousel-slide
                v-for="image in images"
                :key="image"
                :img-src="image"
            />
        </b-carousel>
    </div>
</template>

<script>
export default {
  name: 'image-slider',
  props: {
    title: { type: String, default: '' },
    images: { type: Array, default: () => [] }
  },
  data: () => ({
  }),
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>

<style scoped>
.title {
  color: white;
  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 2em;
}
</style>
