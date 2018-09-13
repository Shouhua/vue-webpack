import defaultRules from './default-rules';
import errMsgTpl from './error-message-template';
import {
  FormItem
} from 'element-ui';

export default {
  name: 'MegValidator',
  componnetName: 'MegValidator',
  props: {
    name: {
      type: Boolean,
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
    name: function () {
      console.log('validate name in megValidator...')
      this.validate('');
    },
    validateMessage: function (msg) {
      this.validateMessage = this.macroToValue(msg, this.label);
    }
  },
  methods: {
    getRules() {
      if (!this.meg) return FormItem.methods.getRules.apply(this, arguments);
      let megRules = [];
      for (let ruleName in defaultRules) {
        if (this[ruleName]) {
          megRules.push(defaultRules[ruleName]);
        }
      }
      if ('function' === typeof this.meg) {
        megRules.push({
          trigger: 'blur',
          validator: this.meg
        });
      }
      return megRules;
    },
    onFieldChange() {
      // const fieldChange = this.fieldChange || this.fieldChange
      if (!this.meg || this.fieldChange !== 'clear') FormItem.methods.onFieldChange.apply(this, arguments)
      else if (this.meg && fieldChange === 'clear') this.clearValidate()
    },
    clearValidate() {
      if (FormItem.methods.clearValidate) {
        FormItem.methods.clearValidate.apply(this, arguments)
      } else {
        this.validateState = '';
        this.validateMessage = '';
        this.validateDisabled = false
      }
    },
    macroToValue(msg, value) {
      return msg.replace(/\{\w+\}/, value)
    }
  }
}