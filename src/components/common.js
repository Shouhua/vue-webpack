// 局部注册component
export default {
  template: `<h1>Hello, I'm a common component</h1>`,
  created() {
    this.greet('common component');
  },
  methods: {
    greet: (name) => {
      console.log(`Hello, ${name}`);
    }
  }
}