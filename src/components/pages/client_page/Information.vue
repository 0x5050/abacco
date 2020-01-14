<template>
  <div id="Information">
    <b-container>
      <b-row>
        <b-card bg-variant="dark" text-variant="white" class="info-text">
          <p class="info-title">
            <span style="color: #ffff00">A</span>bacco
          </p>
          <b-card-text>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus quod soluta eius accusantium
            tempora dolores veniam laboriosam, consequatur sit nesciunt officia temporibus totam et mollitia itaque ipsum tempore recusandae asperiores.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus quod soluta eius accusantium
            tempora dolores veniam laboriosam, consequatur sit nesciunt officia temporibus totam et mollitia itaque ipsum tempore recusandae asperiores.
          </b-card-text>
        </b-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'information'
}
</script>

<style scoped>
#Information {
  background-image: url('../../../assets/info.jpg');
  height: 1080px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.info-title {
  font-size: 3em;
  width: 300px;
  margin: 0
}

.info-text {
  border-radius: 20px;

  margin-left: auto;
  margin-right: auto;
  margin-top: 20%;
  font-size: 1.5em;
}
.bg-dark {
    background-color: #343a40 !important;
    opacity: .95;
}
</style>
