import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import ElementUI from "element-ui";
import axios from "axios";
import dayjs from "dayjs";

/* css */
import "./style/reset.less";
import "normalize.css";
import "element-ui/lib/theme-chalk/index.css";
import "font-awesome/css/font-awesome.css";

/* install */
Vue.use(ElementUI, {
  size: "mini"
});

Vue.prototype.$axios = axios;
Vue.prototype.$dayjs = dayjs;

/* config */
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
