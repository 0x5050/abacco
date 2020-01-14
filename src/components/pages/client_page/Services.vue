<template>
    <b-container fluid id="services" class="bg-dark">
        <b-row>
            <b-col md>
                <h2 class="text-light">Usługi Budowlane </h2>
                <test
                    v-for="building_service in building_services"
                    :key="building_service.service"
                    :categorie="building_service"
                />
            </b-col>

            <b-col md>
                <h2 class="text-light">Usługi Ślusarskie</h2>
                <test
                    v-for="locksmith_service in locksmith_services"
                    :key="locksmith_service.service"
                    :categorie="locksmith_service"
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
  data: () => ({
    building_services: [
      {
        service: 'Usługi Hydrauliczne',
        options: [
          'Instalacje PCV',
          'Instalacje Ameliniowe',
          'Tego nie pomaluje'
        ]
      },
      {
        service: 'Usługi Elektyczne',
        options: [
          'Instalacje miedziane'
        ]
      },
      {
        service: 'Usługi Wykończeniowe',
        options: [
          'Podwieszane sufity'
        ]
      }
    ],
    locksmith_services: [
      {
        service: 'Spawanie',
        options: [
          'Na gorąco',
          'na zimno'
        ]
      },
      {
        service: 'Bramy',
        options: [
          'Ze stali',
          'Z amelinium'
        ]
      }
    ]
  })
}
</script>
