<template>
  <div>
    <div class="sidebar bg-dark text-light" :class="{sidebar_hidden: getSidebarStatus}" >
      <b-nav vertical>
        <b-nav-item
          v-for="route in routes"
          :key="route.path"
          :to="'/'+ rootPath + route.path"
          class="nav-link h4 mt-2 text-decoration-none"
          :class="[$route.name === route.name ? 'nav-active' : '']"
        >
          <b-icon :icon="route.icon" class="float-left"/> {{ route.name }}
        </b-nav-item>
      </b-nav>
    </div>
    <div class="content p-0" :class="{content_extended: getSidebarStatus}" >
      <b-alert
        class="w-50 ml-auto mr-auto"
        :show="getAlert.duration"
        :variant="getAlert.variant"
        fade
      >
        {{ getAlert.message }}
      </b-alert>
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view v-if="$route.path != '/'+ rootPath" />
        <slot v-else/>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'O-Panel',
  props: {
    rootPath: { type: String, default: 'employee' },
    routes: { type: Array, default: () => [] }
  },
  computed: {
    ...mapGetters('sidebar', ['getSidebarStatus']),
    ...mapGetters('alert', ['getAlert'])
  }
}
</script>

<style scoped>
.nav-link {
  color: white
}

.nav-link:hover {
  transition: ease-in-out .5s;
  background-color: black
}

.nav-active {
  background-color: black
}

.sidebar {
    min-height: 100vh;
    width: 250px;
    position: fixed;
    transition: ease 1s;
}

.content {
    margin-left: 250px;
    transition: ease 1s;
    min-height: 90vh;
    background-color: #f5f5f5
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
