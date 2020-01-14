<template>
    <b-container fluid id="gallery" class="bg-dark">
        <b-row>
            <b-col md>
                <image-slider
                    title="Wykończenie Wnętrz"
                    :images="budowa_img"
                />
            </b-col>

            <b-col md>
                <image-slider
                    title="Ślusarka budowlana"
                    :images="slusarka_img"
                />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import ImageSlider from '@/components/ImageSlider'
import img1 from '@/assets/img_1.jpg'
import img2 from '@/assets/img_2.jpg'
import img3 from '@/assets/img_3.jpg'
import img4 from '@/assets/img_4.jpg'
import img6 from '@/assets/img_6.jpg'
import img7 from '@/assets/img_7.jpg'
import img8 from '@/assets/img_8.jpg'
export default {
  name: 'gallery',
  components: {
    ImageSlider
  },
  data: () => ({
    budowa_img: [
      img1,
      img2,
      img3,
      img4
    ],
    slusarka_img: [
      img6,
      img7,
      img8
    ]
  })
}
</script>

<style scoped>

</style>
