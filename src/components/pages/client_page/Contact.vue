<template>
    <b-container fluid id="contact" class="bg-dark pt-5">
      <b-row>
        <b-col
          v-for="company in companies"
          :key="company.nip"
        >
          <b-jumbotron
            :header="company.services"
            :lead="company.company"
            header-level="4"
            class="text-left"
          >
            <hr class="my-4">
            <p>
              Nip: {{ company.nip }} <br>
              {{ company.street }} <br>
              {{ company.zip + ' ' + company.city }}
            </p>
            <hr class="my-4">
            <p>
              Tel: {{ company.phone }} <br>
              Email: {{ company.email}}
            </p>
          </b-jumbotron>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-light mt-5">
         <h1>Zapraszamy do kontaktu </h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col md class="d-flex justify-content-center">
          <b-form-input type="email" placeholder="Email" class="w-50 mb-2" />
        </b-col>
      </b-row>
      <b-row>
        <b-col md class="d-flex justify-content-center">
          <b-form-textarea placeholder="text" rows="5" class="w-50 mb-2" />
        </b-col>
      </b-row>
      <b-row>
        <b-col md class="d-flex justify-content-center" >
          <b-form-file
            placeholder="Wybierz plik lub przeciągnij go tutaj"
            drop-placeholder="Przeciągnij plik tutaj"
            class="w-50 mb-2"
          />
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
export default {
  name: 'contact',
  data: () => ({
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
    ]
  })
}
</script>
