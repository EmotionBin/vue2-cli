import Home from '@/views/Home.vue';

const baseRoutes: Array<any> = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'Home',
    },
    hidden: true, // 控制菜单入口的显示隐藏
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      title: 'About',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
];

export default baseRoutes;
