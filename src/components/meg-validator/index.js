import MegValidator from './meg-validator';

var install = function (Vue) {
  if (install.installed) return;
  install.installed = true;
  var ElFormItemComponent = Vue.component('ElFormItem');
  if (!ElFormItemComponent) throw Error('Please install element-ui first');
  ElFormItemComponent.mixin(MegValidator);
}

MegValidator.install = install;

export default MegValidator;