// 局部注册component
import MixinTest from '@/components/mixin.component';
export default {
  name: 'Common',
  template: `<h1>Hello, I'm a common component</h1>`,
  created() {
    this.greet();
  },
  // mixins: [MixinTest],
  methods: {
    greet: (name) => {
      console.log(`Hello, ${name}`);
    }
  }
}