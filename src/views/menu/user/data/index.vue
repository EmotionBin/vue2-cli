<template>
  <div class="data-wrap" v-loading="isLoading" element-loading-text="数据加载中...">
    <div class="data-head">
      <span class="select-text">用户：</span>
      <el-select v-model="userId" placeholder="请选择用户" filterable>
        <el-option v-for="item in userList" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <span class="date-text">时间：</span>
      <el-date-picker v-model="date" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
        end-placeholder="结束日期" :picker-options="pickerOptions" format="yyyy-MM-dd" value-format="timestamp">
      </el-date-picker>
      <el-button type="primary" @click="searchData">查询</el-button>
    </div>
    <div class="data-body">
      <div class="body-left">
        <div class="left-info">
          <div class="info-item">
            <span class="login-time">总登录次数: {{ loginTime }}</span>
          </div>
        </div>
        <div class="left-chart-wrap">
          <div class="chart-view" ref="chartLoginTimeRange"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { pickerOptions, useTimeRange } from '@/data/views/analysis'
import { getUserData } from '@/api/data'
import { getLogUserList } from '@/api/user'
import { mapGetters } from 'vuex'

export default {
  name: 'userData',
  data () {
    return {
      userId: '',
      userList: [],
      date: [],
      pickerOptions,
      useTimeRange,
      loginTime: 0,
      chart: [],
      isLoading: false
    }
  },
  components: {
  },
  computed: {
    ...mapGetters(['user'])
  },
  watch: {
  },
  created () {
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    // 销毁前取消监听
    window.removeEventListener('resize', this.chartRepaint)
  },
  methods: {
    // 初始化
    async init () {
      // 设置默认时间
      this.date = this.$utils.getTimeRange(-30)
      await this.getUserList()
      // 默认选择当前用户
      this.userId = this.user.userId
      this.getData()
    },
    // 查询用户列表
    async getUserList () {
      try {
        const { data } = await getLogUserList()
        this.userList = data.map(({ username, userId }) => {
          return {
            label: username,
            value: userId
          }
        })
      } catch (error) {
        console.log('获取用户列表时发生了错误', error)
      }
    },
    // 获取数据
    async getData () {
      try {
        if (!this.date) {
          this.$message.warning('请选择时间!')
          return
        }
        const [startTime, endTime] = this.date
        this.isLoading = true
        const { data } = await getUserData({
          userId: this.userId,
          startTime,
          endTime: endTime + 1 * 24 * 60 * 60 * 1000
        })
        const { timeRange, sum } = data
        this.loginTime = sum
        Object.keys(timeRange).forEach((key, index) => {
          this.useTimeRange[index].value = timeRange[key]
        })
        const timeData = this.useTimeRange.filter(item => item.value) // 过滤掉值为 0 的项目
        const chartLoginTimeRangeOption = this.getChartOption({ domRef: 'chartLoginTimeRange', data: timeData })
        this.setchart({ domRef: 'chartLoginTimeRange', option: chartLoginTimeRangeOption })
        this.isLoading = false
        // 窗口大小改变的时候重绘图表
        window.addEventListener('resize', this.chartRepaint)
      } catch (error) {
        console.log('获取用户数据时发生了错误', error)
      }
    },
    // 查询数据
    searchData () {
      this.getData()
    },
    // 绘制图表
    setchart ({ domRef, option }) {
      const dom = this.$refs[domRef]
      const myChart = echarts.init(dom)
      myChart.setOption(option)
      // 只要绘制一个图表就做好记录
      this.chart.push({
        domRef,
        chartCase: myChart
      })
    },
    // 窗口大小改变重绘窗口
    chartRepaint () {
      this.chart.forEach(item => {
        item.chartCase.resize()
      })
    },
    // 图表配置
    getChartOption ({ domRef, data }) {
      const chartLoginTimeRangeOption = {
        title: {
          text: '用户登录时间段',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#666',
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '用户登录时间段',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      const wrap = {
        chartLoginTimeRangeOption
      }
      return wrap[`${domRef}Option`]
    }
  }
}
</script>

<style lang="scss">
.data-wrap{
  height: 100%;
  overflow: hidden;
  .data-head{
    height: 100px;
    @include flex-center;
    border-bottom: 1px solid #d1d1d1;
    .select-text,
    .date-text{
      color: #666;
    }
    .el-select,
    .el-date-editor{
      margin-right: 20px;
    }
  }
  .data-body{
    height: calc(100% - 100px);
    .body-left{
      height: 100%;
      .left-info{
        height: 100px;
        @include flex-center;
        font-size: 26px;
        color: #999;
        border-bottom: 1px solid #d1d1d1;
      }
      .left-chart-wrap{
        height: calc(100% - 100px);
      }
      .chart-view{
        height: 100%;
      }
    }
  }
}
</style>
