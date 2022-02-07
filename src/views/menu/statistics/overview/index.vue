<template>
  <div class="overview-wrap" v-loading="isLoading" element-loading-text="数据加载中...">
    <!-- 数据概览
    1.最近三十天访问人数
    2.总活跃度(用户每进行一次操作活跃度 + 1)
    3.昨日活跃度
    图表
    1.最近一周访问人数折线图
    2.最近一周活跃度柱状图 -->
    <div class="overview-head">
      <template v-for="item in headAccountData">
        <div class="head-area-wrap" :key="item.title">
          <div class="head-area-content">
            <div class="area-title">
              {{ item.title }}
              <span class="title-tips" v-if="item.tips">
                <el-popover
                  placement="top"
                  trigger="hover"
                  :content="item.tips">
                  <i slot="reference" class="el-icon-question"></i>
                </el-popover>
              </span>
            </div>
            <div :class="['area-value', item.name]">{{ item.value }}</div>
          </div>
        </div>
      </template>
    </div>
    <div class="overview-body">
      <div class="body-chart-wrap">
        <div class="chart-view" ref="chartPeopleNumber"></div>
      </div>
      <div class="body-chart-wrap">
        <div class="chart-view" ref="chartActivityLevel"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { headAccountData, chartPeopleNumberData, chartActivityLevelData } from '@/data/views/overview'
import { getStatisticsOverview } from '@/api/data'
import dayjs from 'dayjs'
import echarts from 'echarts'

export default {
  name: 'statisticsOverview',
  data () {
    return {
      headAccountData,
      chartPeopleNumberData,
      chartActivityLevelData,
      chart: [],
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
    // 销毁前取消监听
    window.removeEventListener('resize', this.chartRepaint)
  },
  methods: {
    // 初始化
    async init () {
      try {
        this.isLoading = true
        this.resetData()
        const { data } = await getStatisticsOverview()
        const { lastThirty, sumActivity, yesterday, yesterdayActivity, weekData } = data
        headAccountData[0].value = lastThirty
        headAccountData[1].value = yesterday
        headAccountData[2].value = sumActivity
        headAccountData[3].value = yesterdayActivity
        weekData.forEach(({ activity, date, people }) => {
          const thatDay = dayjs(date).format('YYYY-MM-DD')
          this.chartPeopleNumberData.xData.push(thatDay)
          this.chartActivityLevelData.xData.push(thatDay)
          this.chartPeopleNumberData.value.push(people)
          this.chartActivityLevelData.value.push(activity)
        })
        const chartPeopleNumberOption = this.getChartOption({ domRef: 'chartPeopleNumber', data: this.chartPeopleNumberData })
        this.setchart({ domRef: 'chartPeopleNumber', option: chartPeopleNumberOption })
        const chartActivityLevelOption = this.getChartOption({ domRef: 'chartActivityLevel', data: this.chartActivityLevelData })
        this.setchart({ domRef: 'chartActivityLevel', option: chartActivityLevelOption })
        this.isLoading = false
        // 窗口大小改变的时候重绘图表
        window.addEventListener('resize', this.chartRepaint)
      } catch (error) {
        console.log('获取数据概览数据时发生了错误', error)
      }
    },
    // 清空数据
    resetData () {
      this.headAccountData.forEach(item => {
        item.value = 0
      })
      Object.keys(this.chartPeopleNumberData).forEach(key => {
        this.chartPeopleNumberData[key] = []
      })
      Object.keys(this.chartActivityLevelData).forEach(key => {
        this.chartActivityLevelData[key] = []
      })
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
      const chartPeopleNumberOption = {
        title: {
          text: '最近一周访问人数',
          textStyle: {
            color: '#666',
            fontWeight: 'normal'
          },
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: data.xData
          }
        ],
        yAxis: [
          {
            type: 'value',
            // interval: Math.min(...data.value) || 1,
            max: Math.max(...data.value) + 1
          }
        ],
        series: [
          {
            name: '访问人数',
            type: 'line',
            smooth: true,
            areaStyle: {},
            data: data.value
          }
        ]
      }
      const chartActivityLevelOption = {
        title: {
          text: '最近一周活跃度',
          textStyle: {
            color: '#666',
            fontWeight: 'normal'
          },
          x: 'center'
        },
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: data.xData,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            // interval: Math.min(...data.value) || 1,
            max: Math.max(...data.value) + 1
          }
        ],
        series: [
          {
            name: '活跃度',
            type: 'bar',
            barWidth: '60%',
            data: data.value
          }
        ]
      }
      const wrap = {
        chartPeopleNumberOption,
        chartActivityLevelOption
      }
      return wrap[`${domRef}Option`]
    }
  }
}
</script>

<style lang="scss">
.overview-wrap{
  height: 100%;
  overflow: hidden;
  .overview-head{
    height: 260px;
    display: flex;
    border-bottom: 1px solid #d1d1d1;
    .head-area-wrap{
      flex: 1;
      padding: 20px;
    }
    .head-area-content{
      height: 100%;
      @include flex-center;
      flex-direction: column;
      font-size: 30px;
      color: #999;
      border: 1px solid #e9e9e9;
      box-shadow: 0 0 4px #d1d1d1;
      .area-title{
        margin-bottom: 20px;
        .title-tips{
          outline: none;
          cursor: pointer;
        }
      }
      .area-value{
        &.lastThirty{
          color: rgb(56, 157, 247);
        }
        &.yesterday{
          color: rgb(60, 217, 158);
        }
        &.sumActivity{
          color: rgb(250, 199, 79);
        }
        &.yesterdayActivity{
          color: rgb(254, 142, 88);
        }
      }
    }
  }
  .overview-body{
    height: calc(100% - 260px);
    display: flex;
    .body-chart-wrap{
      width: 50%;
      padding: 20px;
    }
    .chart-view{
      height: 100%;
    }
  }
}
</style>
