const f = day => {
  const end = new Date()
  const start = new Date()
  start.setTime(start.getTime() - 3600 * 1000 * 24 * day)
  return [start, end]
}

// 日期选择器限制
export const pickerOptions = {
  shortcuts: [
    {
      text: '最近一周',
      onClick (picker) {
        picker.$emit('pick', f(7))
      }
    },
    {
      text: '最近一个月',
      onClick (picker) {
        picker.$emit('pick', f(30))
      }
    },
    {
      text: '最近三个月',
      onClick (picker) {
        picker.$emit('pick', f(90))
      }
    }
  ],
  disabledDate: time => time.getTime() > Date.now()
}

// 登录方式数据
export const loginTypeData = [
  {
    value: 0,
    name: '微信登录'
  },
  {
    value: 0,
    name: '普通登录'
  }
]

// 用户使用时段数据
export const useTimeRange = [
  {
    value: 0,
    name: '0:00-8:00'
  },
  {
    value: 0,
    name: '8:00-12:00'
  },
  {
    value: 0,
    name: '12:00-18:00'
  },
  {
    value: 0,
    name: '18:00-24:00'
  }
]
