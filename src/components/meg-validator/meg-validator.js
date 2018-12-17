import defaultRules from './default-rules';
// import errMsgTpl from './error-message-template';
import {
  FormItem
} from 'element-ui';

export default {
  name: 'MegFormValidator',
  componentName: 'MegFormValidator',
  props: { // TODO: 1. 通过rules文件动态扩展
    // 2. name collision, use rule 重名 自定义可以加project name，比如name_alarm
    // name: {
    //   type: Boolean,
    //   default: undefined
    // },
    charNumber: {
      type: [Boolean, Object],
      default: undefined
    },
    required: {
      type: Boolean,
      default: undefined
    },
    meg: {
      type: [Boolean, Function],
      default: undefined
    },
    fieldChange: {
      type: String,
      default: undefined
    }
  },
  watch: {
    // name: function () {
    //   console.log('validate name in megValidator...')
    //   this.validate('');
    // },
    validateMessage: function (msg) {
      this.validateMessage = this.macroToValue(msg, this.label);
    }
  },
  methods: {
    getRules(...rest) {
      if (!this.meg) return FormItem.methods.getRules.apply(this, rest);
      const megRules = [];
      Object.keys(defaultRules).forEach((ruleName) => {
        if (this[ruleName]) {
          // if exist rule in default rule
          if (typeof this[ruleName] === 'object') {
            // TODO
          } else {
            megRules.push(defaultRules[ruleName]);
          }
        }
      });

      if (typeof this.meg === 'function') {
        megRules.push({
          trigger: 'blur',
          validator: this.meg
        });
      }
      return megRules;
    },
    // onFieldChange() {
    //   // const fieldChange = this.fieldChange || this.fieldChange
    //   if (!this.meg || this.fieldChange !== 'clear') FormItem.methods.onFieldChange.apply(this, arguments)
    //   else if (this.meg && fieldChange === 'clear') this.clearValidate()
    // },
    // clearValidate() {
    //   if (FormItem.methods.clearValidate) {
    //     FormItem.methods.clearValidate.apply(this, arguments)
    //   } else {
    //     this.validateState = '';
    //     this.validateMessage = '';
    //     this.validateDisabled = false
    //   }
    // },
    macroToValue(msg, value) {
      return msg.replace(/\{\w+\}/, value)
    },
    // resovleRule(rule, placehold) {
      
    // }
  }
}