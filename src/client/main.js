import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "./router";
import VueCookie from "vue-cookie";
import store from "./store";
import moment from "moment-timezone";
import iView from "iview";
import "iview/dist/styles/iview.css";

axios.defaults.baseURL = "https://tradish-server.herokuapp.com";
Vue.config.productionTip = false;
Vue.use(axios);
Vue.use(iView);
Vue.use(moment);
Vue.use(VueCookie);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
