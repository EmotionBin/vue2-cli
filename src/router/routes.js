import menuRouter from './modules/menu'

const meta = {
  auth: true
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/',
    name: 'index',
    meta,
    redirect: { name: 'statisticsOverview' },
    component: () => import('../views/home/index.vue'),
    children: [
      ...menuRouter
    ]
  },
  {
    path: '/redirect/:route',
    name: 'redirect',
    redirect: to => { return { name: to.params.route } }
  },
  {
    path: '*',
    name: 'notFound',
    component: () => import('../views/404/index.vue')
  }
]

export default routes
