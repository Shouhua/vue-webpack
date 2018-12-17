import MegFormValidator from './meg-validator';

var install = function (Vue) {
  if (install.installed) return;
  install.installed = true;
  var ElFormItemComponent = Vue.component('ElFormItem');
  if (!ElFormItemComponent) throw Error('Please install element-ui first');
  ElFormItemComponent.mixin(MegFormValidator);
}

MegFormValidator.install = install;

export default MegFormValidator;