import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';

Vue.use(Router);

const constantRoutes: RouteConfig[] = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "user" */ '@/layouts/index.vue')
  },
];

const creatRouter = () =>
  new Router({
    mode: 'history', // github page 不支持 history 模式，此选项需要的时候再关闭
    base: process.env.BASE_URL,
    routes: constantRoutes,

    /**
     * @description 定义滚动行为
     *
     * 浏览器前进/返回不滚动，路由正常跳转自动滚动到顶部
     */
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    }
  });

const router = creatRouter();

export default router;
