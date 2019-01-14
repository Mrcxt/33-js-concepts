import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import ElementUI from "element-ui";

/* css */
import "normalize.css";
import "element-ui/lib/theme-chalk/index.css";

/* use */
Vue.use(ElementUI, {
  size: "mini"
});

/* config */
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
