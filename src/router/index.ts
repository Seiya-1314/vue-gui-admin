import Vue from 'vue';
import Router, { RouteConfig, RouteRecord } from 'vue-router';
import findLast from 'lodash/findLast';
import { Message } from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'

import NotFound from '@/views/error-page/404.vue';
import Forbidden from '@/views/error-page/403.vue';
import { check, islogin } from '@/utils/auth';

Vue.use(Router);

export interface newRouteConfig extends RouteConfig {
  hideInMenu?: boolean;
  hideChildrenMenu?: boolean;
  children?: newRouteConfig[];
}

const constantRoutes: newRouteConfig[] = [
  {
    path: '/user',
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "user" */ '@/layouts/index.vue'),
    children: [
      {
        path: '/user',
        redirect: '/user/login'
      },
      {
        path: '/user/login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/login/index.vue')
      }
    ]
  },
  {
    path: '/',
    meta: { authority: ['user', 'admin'] },
    component: () =>
      import(/* webpackChunkName: "user" */ '@/layouts/index.vue'),
    children: [
      {
        path: '/',
        redirect: '/guide'
      },
      {
        path: '/guide',
        name: 'guide',
        meta: {
          icon: 'guide',
          title: '首页'
        },
        component: () =>
          import(/* webpackChunkName: "guide" */ '@/views/guide/index.vue')
      },
      {
        path: '/consult',
        name: 'consult',
        meta: {
          icon: 'consult',
          title: '在线咨询'
        },
        component: () =>
          import(/* webpackChunkName: "consult" */ '@/views/guide/index.vue')
      }
    ]
  },
  // 403
  {
    path: '/403',
    name: '403',
    hideInMenu: true,
    component: Forbidden
  },
  // 404
  {
    path: '*',
    name: '404',
    hideInMenu: true,
    component: NotFound
  }
];

const creatRouter = () =>
  new Router({
    // mode: 'history', // github page 不支持 history 模式，此选项需要的时候再关闭
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

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  const record = findLast(
    to.matched,
    record => record.meta.authority
  ) as RouteRecord;

  if (record && !check(record.meta.authority)) {
    if (!islogin() && to.path !== '/user/login') {
      next({
        path: '/user/login'
      });
    } else if (to.path !== '/403') {
      Message({
        showClose: true,
        message: '抱歉，您没有权限访问，请联系管理员！',
        type: 'warning'
      });
      next({
        path: '/403'
      });
    }
    NProgress.done();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
