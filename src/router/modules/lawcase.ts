import { newRouteConfig } from '../index';

export const lawcaseRoutes: newRouteConfig = {
  path: '/lawcase',
  name: 'lawcase',
  meta: {
    icon: 'form',
    title: '案件管理'
  },
  component: () =>
    import(/* webpackChunkName: "lawcase" */ '@/layouts/index.vue'),
  children: [
    {
      path: '/lawcase',
      redirect: '/lawcase/selected'
    },
    {
      path: '/lawcase/selected',
      name: 'selected',
      meta: {
        title: '自选案件'
      },
      component: () =>
        import(
          /* webpackChunkName: "lawcase" */ '@/views/lawcase/selected/index.vue'
        )
    },
    {
      path: '/lawcase/recommend',
      name: 'recommend',
      meta: {
        title: '推荐案件'
      },
      component: () =>
        import(
          /* webpackChunkName: "lawcase" */ '@/views/lawcase/recommend/index.vue'
        )
    }
  ]
};
