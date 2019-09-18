import { newRouteConfig } from '../index';

export const businessRoutes: newRouteConfig = {
  path: '/business',
  name: 'business',
  meta: {
    icon: 'shopping',
    title: '付费业务',
  },
  component: () => import(/* webpackChunkName: "business" */ '@/layouts/index.vue'),
  children: [
    {
      path: '/business',
      redirect: '/business/text_consult'
    },
    {
      path: '/business/text_consult',
      name: 'text_consult',
      meta: {
        title: '文字咨询',
      },
      component: () =>
        import(/* webpackChunkName: "user" */ '@/views/login/index.vue')
    },
    {
      path: '/business/phone_consult',
      name: 'phone_consult',
      meta: {
        title: '电话咨询',
      },
      component: () =>
        import(/* webpackChunkName: "user" */ '@/views/login/index.vue')
    },
    {
      path: '/business/vip',
      name: 'vip',
      meta: {
        title: '专项服务',
      },
      component: () =>
        import(/* webpackChunkName: "user" */ '@/views/login/index.vue')
    },
    {
      path: '/business/quick',
      name: 'quick',
      meta: {
        title: '快问快答',
      },
      component: () =>
        import(/* webpackChunkName: "user" */ '@/views/login/index.vue')
    },
    {
      path: '/business/pay_list',
      name: 'pay_list',
      meta: {
        title: '支付记录',
      },
      component: () =>
        import(/* webpackChunkName: "user" */ '@/views/login/index.vue')
    },
    {
      path: '/business/evaluation',
      name: 'evaluation',
      meta: {
        title: '评价列表',
      },
      component: () =>
        import(/* webpackChunkName: "user" */ '@/views/login/index.vue')
    }
  ]
};
