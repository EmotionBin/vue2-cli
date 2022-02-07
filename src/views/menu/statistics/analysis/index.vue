<template>
  <div class="analysis-wrap" v-loading="isLoading" element-loading-text="数据加载中...">
    <!-- 1.登录方式 微信登录与普通登录 饼图
    2.用户使用时间段 饼图 0:00-8:00 8:00-12:00 12:00-18:00 18:00-0:00
    数据分析 -->
    <div class="analysis-head">
      <el-date-picker v-model="date" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
        :picker-options="pickerOptions" format="yyyy-MM-dd" value-format="timestamp">
      </el-date-picker>
      <el-button class="head-btn" type="primary" @click="getData">查询</el-button>
    </div>
    <div class="analysis-body">
      <div class="analysis-chart-wrap">
        <div class="chart-view" ref="chartLoginWay"></div>
      </div>
      <div class="analysis-chart-wrap">
        <div class="chart-view" ref="chartTimeRange"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { pickerOptions, loginTypeData, useTimeRange } from '@/data/views/analysis'
import { getStatisticsAnalysis } from '@/api/data'
import echarts from 'echarts'

export default {
  name: 'statisticsAnalysis',
  data () {
    return {
      chart: [],
      date: [],
      pickerOptions,
      loginTypeData,
      useTimeRange,
      isLoading: false
    }
  },
  components: {
  },
  computed: {
  },
  watch: {
  },
  created () {
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
  },
  methods: {
    // 初始化
    init () {
      this.date = this.$utils.getTimeRange(-30)
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
      const chartLoginWayOption = {
        title: {
          text: '用户登录方式',
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
            name: '登录方式',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data,
            labelLine: {
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: idx => Math.random() * 200
          }
        ]
      }
      const chartTimeRangeOption = {
        title: {
          text: '用户使用时间段',
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
            name: '用户使用时间段',
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
        chartLoginWayOption,
        chartTimeRangeOption
      }
      return wrap[`${domRef}Option`]
    },
    // 查询数据
    async getData () {
      try {
        if (!this.date) {
          this.$message.warning('请选择时间!')
          return
        }
        this.isLoading = true
        const [startTime, endTime] = this.date
        const { data } = await getStatisticsAnalysis({
          startTime,
          endTime: endTime + 1 * 24 * 60 * 60 * 1000
        })
        const { loginTime, wxLoginTime, timeRange } = data
        this.loginTypeData[0].value = wxLoginTime
        this.loginTypeData[1].value = loginTime
        const loginTypeDataSort = this.loginTypeData
          .sort((a, b) => a.value - b.value)
          .filter(item => item.value) // 过滤掉值为 0 的项目
        const chartLoginWayOption = this.getChartOption({ domRef: 'chartLoginWay', data: loginTypeDataSort })
        this.setchart({ domRef: 'chartLoginWay', option: chartLoginWayOption })
        Object.keys(timeRange).forEach((key, index) => {
          this.useTimeRange[index].value = timeRange[key]
        })
        const timeData = this.useTimeRange.filter(item => item.value) // 过滤掉值为 0 的项目
        const chartTimeRangeOption = this.getChartOption({ domRef: 'chartTimeRange', data: timeData })
        this.setchart({ domRef: 'chartTimeRange', option: chartTimeRangeOption })
        this.isLoading = false
        // 窗口大小改变的时候重绘图表
        window.addEventListener('resize', this.chartRepaint)
      } catch (error) {
        console.log('获取数据分析数据时发生了错误', error)
      }
    }
  }
}
</script>

<style lang="scss">
.analysis-wrap{
  height: 100%;
  overflow: hidden;
  .analysis-head{
    height: 100px;
    @include flex-center;
    border-bottom: 1px solid #d1d1d1;
    .head-btn{
      margin-left: 20px;
    }
  }
  .analysis-body{
    display: flex;
    height: calc(100% - 100px);
    .analysis-chart-wrap{
      width: 50%;
      padding: 20px;
    }
    .chart-view{
      height: 100%;
    }
  }
}
</style>
