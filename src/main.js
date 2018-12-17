import Vue from "vue";
import AppComponent from './App.vue';
import router from './utils/app.router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import MegFormValidator from 'meg-validator';
// import MegFormValidator from './meg-validator.esm';
import Common from '@/components/common';
import MixinTest from '@/components/mixin.component';
import commonUtils from './utils/common.util';

if(window) {
  window.print = commonUtils.print;
  window.warn = commonUtils.warn;
  window.error = commonUtils.error;
}

Vue.use(ElementUI);
Vue.use(MegFormValidator, {
  name: [
    {
      required: true,
      trigger: 'blur',
      message: '{{name}}不能为空',
      default: { name: '用户名' }
    },
    {
      trigger: 'blur',
      pattern: '^[0-9a-zA-Z]{{{min}},{{max}}}$',
      message: '请输入{{min}}-{{max}}位数字、字母、符号',
      default: { min: 5, max: 20 }
    }
  ],
  'char-or-number': {
    trigger: 'blur',
    pattern: '^.{{{min}},{{max}}}$',
    message: '请输入{{min}}-{{max}}位数字、字母、符号',
    default: { min: 5, max: 20 }
  }
});

// Vue.mixin({
//   methods: {
//     greet: () => {
//       console.log(`globall greet...`);
//     }
//   }
// });

Vue.component('common', Common);
var common = Vue.component('common');
common.mixin(MixinTest);

var vm = new Vue({
  el: '#app',
  router,
  components: {
    app: AppComponent
  },
  template: `
    <div>
    <common></common>
    <app/>
    </div>
  `
});

// console.log(vm.constructor.component('common'));