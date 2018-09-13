import Vue from "vue";
import AppComponent from './App.vue';
import router from './utils/app.router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import ElementUIVerify from 'element-ui-verify';
import MegValidator from '@/components/meg-validator/index.js';

Vue.use(ElementUI);
Vue.use(MegValidator);
// Vue.use(ElementUIVerify);

new Vue({
  el: '#app',
  router,
  components: {
    app: AppComponent
  },
  template: `
    <app/>
  `
});