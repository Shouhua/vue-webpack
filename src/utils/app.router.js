import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

var routes = [
];

// require.context自动化注册所有路由配置
const requireComponent = require.context('@/modules', true, /\.router.js$/);

requireComponent.keys().forEach((fileName) => {
  const routerConfig = requireComponent(fileName);
  routes.push(...routerConfig.default);
});

const router = new VueRouter({
  routes
});

export default router;