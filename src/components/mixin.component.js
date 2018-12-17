export default {
  name: 'MixinTest',
  created() {
    this.greet('abc component');
  },
  methods: {
    greet: function() {
      // console.log('just for mixin test');
    }
  }
}