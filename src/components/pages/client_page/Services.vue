<template>
    <b-container fluid id="services" class="bg-dark">
        <b-row>
            <b-col md>
                <h2 class="text-light mt-4">Usługi Budowlane </h2>
                <test
                    v-for="service in firstServices"
                    :key="service.service"
                    :categorie="service"
                />
            </b-col>

            <b-col md>
                <h2 class="text-light mt-4">Usługi Ślusarskie</h2>
                <test
                    v-for="service in secondServices"
                    :key="service.service"
                    :categorie="service"
                />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import test from '@/components/molecules/CollapsedServices'
export default {
  name: 'services',
  components: {
    test
  },
  props: {
    firstServices: { type: Array, default: () => [] },
    secondServices: { type: Array, default: () => [] }
  }
}
</script>
