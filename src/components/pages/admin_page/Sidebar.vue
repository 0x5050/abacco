<template>
    <div>
        <div class="sidebar bg-dark text-light" :class="{sidebar_hidden: sidebar}" >
            {{ sidebar }}
        </div>
        <div class="content p-0" :class="{content_extended: sidebar}" >
            <router-view/>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'sidebar',
  data: () => ({
    window_width: null
  }),
  computed: {
    ...mapGetters(['sidebar'])
  },
  methods: {
    ...mapMutations(['set_sidebar'])
  }
}
</script>

<style scoped>
.sidebar {
    min-height: 100vh;
    width: 250px;
    position: fixed;
    transition: ease 1s;
}

.content {
    margin-left: 250px;
    transition: ease 1s;
}
@media only screen and (max-width: 750px) {
    .sidebar_hidden {
      transform: translateX(-600px)
    }

    .content.content_extended {
        margin-left: 0 !important;
    }
}
</style>
