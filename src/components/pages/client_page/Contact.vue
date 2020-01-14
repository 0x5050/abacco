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
              {{ `${company.zip} ${company.city} `}}
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
  props: {
    companies: { type: Array, default: () => [] }
  }
}
</script>
