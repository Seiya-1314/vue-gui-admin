import { newRouteConfig } from '../index';

export const lawyerRoutes: newRouteConfig = {
  path: '/lawyer',
  name: 'lawyer',
  meta: {
    icon: 'user',
    title: '律师管理'
  },
  component: () =>
    import(/* webpackChunkName: "lawyer" */ '@/layouts/index.vue'),
  children: [
    {
      path: '/lawyer',
      redirect: '/lawyer/list'
    },
    {
      path: '/lawyer/list',
      name: 'selected',
      meta: {
        title: '律师列表'
      },
      component: () =>
        import(
          /* webpackChunkName: "lawyer" */ '@/views/lawyer/list/index.vue'
        )
    },
    {
      path: '/lawyer/point',
      name: 'point',
      meta: {
        title: '积分记录'
      },
      component: () =>
        import(
          /* webpackChunkName: "lawyer" */ '@/views/lawyer/point/index.vue'
        )
    }
  ]
};
