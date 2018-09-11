import Vue from "vue";
import AppComponent from './App.vue';
import router from './utils/app.router';

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
