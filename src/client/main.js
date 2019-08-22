import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import moment from "moment";
import iView from "iview";
import "iview/dist/styles/iview.css";

Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(moment);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
