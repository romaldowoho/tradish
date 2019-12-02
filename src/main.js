import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueCookie from "vue-cookie";
import store from "./store";
import moment from "moment-timezone";
import iView from "iview";
//import "./my-theme/index.less";
import "iview/dist/styles/iview.css";

Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(moment);
Vue.use(VueCookie);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
