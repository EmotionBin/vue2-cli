import dataAccount from '@/assets/menu/data-account.png'
import userAction from '@/assets/menu/user-operation.png'

export default [
  {
    title: '数据统计',
    alias: 'dataAccount',
    icon: dataAccount,
    show: true,
    subMenu: [
      {
        title: '数据概览',
        alias: 'statisticsOverview',
        icon: '',
        path: '/statistics/overview',
        show: true
      },
      {
        title: '数据分析',
        alias: 'statisticsAnalysis',
        icon: '',
        path: '/statistics/analysis',
        show: true
      }
    ]
  },
  {
    title: '用户行为',
    alias: 'userAction',
    icon: userAction,
    show: true,
    subMenu: [
      {
        title: '用户操作',
        alias: 'userOperation',
        icon: '',
        path: '/user/operation',
        show: true
      },
      {
        title: '用户数据',
        alias: 'userData',
        icon: '',
        path: '/user/data',
        show: true
      }
    ]
  }
]
