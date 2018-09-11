<template>
  <div class='app'>
    <button class="btn" @click="toDashboard">Dashbord</button>
    <button class="btn" @click="toAbout">About</button>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  methods: {
    toDashboard() {
      this.$router.push({
        path: '/dashboard'
      });
    },
    toAbout() {
      this.$router.push({
        path: '/about'
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.app {
  .btn {
    background: lightblue;
    color: black;
    border-radius: 3px;
  }
}
</style>


/*
import CommonComponent from '@/components/common.js';

// 局部注册component
export default {
  name: 'app',
  components: {
    common: CommonComponent
  },
  template: `
    <div>
      <h1>Hello, {{name}}</h1>
      <div>
        <input type="text" v-model="name"/>
      </div>
      <common></common>
    </div>
  `,
  data: function() { // 每个组件实例都有自己的数据对象拷贝
    return {
      name: 'world'
    }
  }
}
*/

/*
// 全局注册组件
import Vue from 'vue' // 全局注册需要引入vue
Vue.component('app', {
  components:
    {common: CommonComponent},
  template: `
    <div>
      <h1>Hello, {{name}}</h1>
      <div>
        <input type="text" v-model="name"/>
      </div>
      <common></common>
    </div>
  `,
  data: function() { // 每个组件实例都有自己的数据对象拷贝
    return {
      name: 'world'
    }
  }
});
*/