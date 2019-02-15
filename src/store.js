import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sidebarIsCollapse: false
  },
  getters: {
    sidebarIsCollapse: state => state.sidebarIsCollapse
  },
  mutations: {
    SET_SIDEBAR_IS_COLLAPSE(state, sidebarIsCollapse) {
      state.sidebarIsCollapse = sidebarIsCollapse;
    }
  },
  actions: {},
  modules: {}
});
