<template>
    <b-container fluid id="gallery" class="bg-dark">
        <b-row>
            <b-col md>
                <image-slider
                    title="Wykończenie Wnętrz"
                    :images="firstImages"
                />
            </b-col>

            <b-col md>
                <image-slider
                    title="Ślusarka budowlana"
                    :images="secondImages"
                />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import ImageSlider from '@/components/client_page/ImageSlider'
export default {
  name: 'gallery',
  components: {
    ImageSlider
  },
  props: {
    firstImages: { type: Array, default: () => [] },
    secondImages: { type: Array, default: () => [] }
  }
}
</script>
