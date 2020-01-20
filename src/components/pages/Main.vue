<template>
    <div>
        <nav-bar
          :logo="Logo"
          :buttons="buttons"
        />
        <information />
        <gallery
          :first-images="budowa_img"
          :second-images="slusarka_img"
        />
        <services
          :first-services="building_services"
          :second-services="locksmith_services"
        />
        <contact
          :companies="companies"
        />
    </div>
</template>

<script>
import NavBar from '@/components/client_page/NavBar'
import Information from '@/components/client_page/Information'
import Gallery from '@/components/client_page/Gallery'
import Services from '@/components/client_page/Services'
import Contact from '@/components/client_page/Contact'

import Logo from '@/assets/logo.png'
import img1 from '@/assets/img_2.jpg'
import img2 from '@/assets/img_3.jpg'
export default {
  name: 'Main',
  components: {
    NavBar,
    Information,
    Gallery,
    Contact,
    Services
  },
  data: () => ({
    Logo,
    buttons: [
      { name: 'Galeria', href: '#gallery' },
      { name: 'Informacje', href: '#Information' },
      { name: 'Usługi', href: '#services' },
      { name: 'Kontakt', href: '#contact' }
    ],
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
    ],
    companies: [
      {
        company: 'PPUH Agat Krystyna Cierlicka',
        nip: '1234 1234 1234 1234',
        street: 'Warneńska 12c/2',
        zip: '80-288',
        city: 'Gdańsk',
        phone: '123 345 789',
        email: 'uslugibudowlane@gmail.com',
        services: 'Usługi budowlane'
      },
      {
        company: 'PPUH Abacco Krzysztof Żurek',
        nip: '1234 1234 1234 1244',
        street: 'Aleja Grunwaldzka 238d',
        zip: '80-266',
        city: 'Gdańsk',
        phone: '123 345 789',
        email: 'usługislusarskie@gmail.com',
        services: 'Usługi ślusarskie'
      }
    ],
    budowa_img: [
      img1,
      img2
    ],
    slusarka_img: [
      img2,
      img1
    ]
  })
}
</script>
