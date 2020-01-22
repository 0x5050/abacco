<template>
    <div>
        <div class="sidebar bg-dark text-light" :class="{sidebar_hidden: getSidebarStatus}" >
            <b-nav vertical>
              <b-nav-item
                v-for="route in routes"
                :key="route.path"
                :to="'/'+ rootPath + route.path"
                class="nav-link h4 mt-2 text-decoration-none"
              >
                <b-icon :icon="route.icon" class=" float-left"/> {{ route.name }}
              </b-nav-item>
            </b-nav>
        </div>
        <div class="content p-0" :class="{content_extended: getSidebarStatus}" >
            <router-view v-if="$route.path != '/'+ rootPath" />
            <slot v-else/>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'O-Panel',
  props: {
    rootPath: {type: String, default: 'employee'},
    routes: { type: Array, default: () => [] }
  },
  data: () => ({
    sidebar: true // TODO Repair this
  }),
  computed: {
    ...mapGetters('sidebar', ['getSidebarStatus'])
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
