import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import SocialSharing from "vue-social-sharing";
import VueAnalytics from 'vue-analytics'
Vue.use(SocialSharing);
Vue.use(VueAnalytics, {
  id: 'G-BWY3SNM33X'
})
Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");


