<template>
  <div class="operation-wrap" v-loading="isLoading" element-loading-text="数据加载中...">
    <div class="operation-head">
      <span class="select-text">用户：</span>
      <el-select v-model="user" placeholder="请选择用户" clearable filterable>
        <el-option v-for="item in userList" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <span class="date-text">时间：</span>
      <el-date-picker v-model="date" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
        end-placeholder="结束日期" :picker-options="pickerOptions" format="yyyy-MM-dd" value-format="timestamp">
      </el-date-picker>
      <el-button type="primary" @click="searchData">查询</el-button>
    </div>
    <div class="operation-body">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column label="序号" type="index" width="160" :index="indexMethod" align="center"></el-table-column>
        <template v-for="item in tableCofig">
          <el-table-column :label="item.label" :key="item.label" :show-overflow-tooltip="true" align="center">
            <template slot-scope='scope'>
              <div class="table-info">
                <span class="info-text">
                  <template v-if="item.prop === 'time'">
                    {{ formatTime(scope.row[item.prop]) }}
                  </template>
                  <template v-else-if="item.prop === 'status'">
                    {{ scope.row[item.prop] === 1 ? '成功' : '失败' }}
                  </template>
                  <template v-else-if="item.prop === 'action'">
                    {{ formatMessage(scope.row[item.prop]) }}
                  </template>
                  <template v-else>
                    {{ scope.row[item.prop] }}
                  </template>
                </span>
              </div>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div class="operation-footer">
      <div class="footer-account">
        共{{page.total}}条记录&nbsp;&nbsp;  第{{page.number}}/{{getMaxPageNumber}}页
      </div>
      <el-pagination background layout="prev, pager, next, slot, jumper" :total="page.total" :page-size="page.size"
        :current-page.sync="page.number" @current-change="pageChange">
        <span class="footer-page-count">&nbsp;共{{getMaxPageNumber}}页<span class="footer-divider">|</span></span>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { pickerOptions } from '@/data/views/analysis'
import { getUserOperation } from '@/api/data'
import { getLogUserList } from '@/api/user'
import { tableCofig } from '@/data/views/operation'

export default {
  name: 'userOperation',
  data () {
    return {
      user: '',
      userList: [],
      date: [],
      pickerOptions,
      tableCofig,
      tableData: [],
      page: {
        size: 10,
        number: 1,
        total: 100
      },
      isLoading: false
    }
  },
  components: {
  },
  computed: {
    getMaxPageNumber () {
      return Math.ceil(this.page.total / this.page.size)
    }
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
      // 设置默认时间
      this.date = this.$utils.getTimeRange(-30)
      this.getUserList()
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
    async getData (number = 1) {
      try {
        if (!this.date) {
          this.$message.warning('请选择时间!')
          return
        }
        const [startTime, endTime] = this.date
        this.isLoading = true
        const { data } = await getUserOperation({
          userId: this.user,
          startTime,
          endTime: endTime + 1 * 24 * 60 * 60 * 1000,
          size: this.page.size,
          number
        })
        const { logPageList, sum } = data
        this.tableData = logPageList
        this.page.total = sum
        this.isLoading = false
      } catch (error) {
        console.log('获取用户操作数据时发生了错误', error)
      }
    },
    // 查询数据
    searchData () {
      this.page.number = 1
      this.getData()
    },
    // 自定义表格索引
    indexMethod (index) {
      return (this.page.number - 1) * this.page.size + index + 1
    },
    // 翻页
    pageChange (page) {
      this.page.number = page
      this.getData(this.page.number)
    },
    // 格式化时间
    formatTime (time) {
      return dayjs(+time).format('YYYY-MM-DD HH:mm:ss')
    },
    // 格式化消息
    formatMessage (message) {
      return window.decodeURI(message)
    }
  }
}
</script>

<style lang="scss">
.operation-wrap{
  height: 100%;
  overflow: hidden;
  .operation-head{
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
  .operation-body{
    height: calc(100% - 200px);
    padding: 20px;
    .table-info{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .operation-footer{
    position: relative;
    height: 100px;
    @include flex-center;
    .footer-account{
      position: absolute;
      left: 30px;
      font-size: 14px;
      color: #666;
    }
    .footer-page-count{
      font-weight:normal;
      color: #666;
    }
    .footer-divider{
      display: inline;
      margin-left: 20px;
    }
  }
}
</style>
