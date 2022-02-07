// 左侧菜单路由

const meta = {
  auth: true
}

export default [
  {
    path: 'statistics/overview',
    name: 'statisticsOverview',
    meta,
    component: () => import('@/views/menu/statistics/overview/index.vue')
  },
  {
    path: 'statistics/analysis',
    name: 'statisticsAnalysis',
    meta,
    component: () => import('@/views/menu/statistics/analysis/index.vue')
  },
  {
    path: 'user/operation',
    name: 'userOperation',
    meta,
    component: () => import('@/views/menu/user/operation/index.vue')
  },
  {
    path: 'user/data',
    name: 'userData',
    meta,
    component: () => import('@/views/menu/user/data/index.vue')
  }
]
