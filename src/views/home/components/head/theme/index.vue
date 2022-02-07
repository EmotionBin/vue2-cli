<template>
  <div class="theme-wrap">
    <el-tooltip
      effect="dark"
      content="主题"
      placement="bottom">
      <el-button
        type="text"
        @click="dialogVisible = true">
        <i class="el-icon-star-off"></i>
      </el-button>
    </el-tooltip>
    <el-dialog
      title="主题"
      width="600px"
      :visible.sync="dialogVisible"
      :append-to-body="true">
      <theme-list style="margin-top: -25px;" :activeName="theme.activeName"/>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ThemeList from './components/index.vue'

export default {
  name: 'themeIndex',
  data () {
    return {
      dialogVisible: false
    }
  },
  components: {
    ThemeList
  },
  computed: {
    ...mapGetters(['theme'])
  },
  created () {
  },
  mounted () {
    this.init()
  },
  watch: {
  },
  methods: {
    ...mapMutations('theme', [
      'updateActiveTheme'
    ]),
    // 初始化 设置主题
    init () {
      const activeName = window.localStorage.getItem('web-chat-admin-theme') || 'classic'
      this.updateActiveTheme({ activeName })
    }
  }
}
</script>

<style lang="scss">
.theme-wrap{
  margin: 0 10px;
  .el-button{
    // color: #ccc;
    padding: 6px;
    font-size: 20px;
    // &:hover{
    //   // color: rgba(255, 255, 255, .9);
    //   // background: #545f6a;
    // }
  }
}
</style>
