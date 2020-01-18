<template>
    <div>
        <div class="sidebar bg-dark text-light" :class="{sidebar_hidden: sidebar}" >
            <b-nav vertical>
              <b-nav-item
                v-for="route in routes"
                :key="route.path"
                :to="'/admin' + route.path"
              >
                <b-icon :icon="route.icon" /> {{ route.name }}
              </b-nav-item>
            </b-nav>
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
    window_width: null,
    routes: [
      {
        name: 'Użytkownicy',
        path: '/user-menagment',
        icon: 'person-fill'
      }
    ],
    transitionName: 'slide-right'
  }),
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
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
