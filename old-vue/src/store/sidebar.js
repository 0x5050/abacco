export default {
  namespaced: true,
  state: {
    sidebar: true
  },
  getters: {
    getSidebarStatus: state => state.sidebar
  },
  mutations: {
    setSidebarStatus: (state) => { state.sidebar = !state.sidebar }
  },
  actions: {
  }
}
