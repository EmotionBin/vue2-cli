<template>
  <div class="menu-wrap">
    <el-menu unique-opened :default-active="getCurrentRoute" @select="handleSelectItem">
      <template v-for="item in menuList">
        <el-submenu v-if="item.subMenu" :index="item.alias" :key="item.alias">
          <template slot="title">
            <i class="menu-icon" :style="{'background-image':`url(${item.icon})`}"></i>
            <span class="menu-title">{{item.title}}</span>
          </template>
          <template v-for="item1 in item.subMenu">
            <el-menu-item :index="item1.path" :key="item1.alias">{{item1.title}}</el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item v-else :index="item.alias" :key="item.alias">
          <i class="menu-icon" :style="{'background-image':`url(${item.icon})`}"></i>
          <span class="menu-title">{{item.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import menuList from '@/data/menu/index.js'
import { mapMutations } from 'vuex'

export default {
  name: 'menuIndex',
  data () {
    return {
      menuList
    }
  },
  components: {
  },
  computed: {
    getCurrentRoute () {
      return this.$route.path
    }
  },
  watch: {
  },
  created () {
    this.init()
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    ...mapMutations('menu', [
      'updateActiveMenu'
    ]),
    // 初始化 设置参数
    init () {
    },
    // 点击菜单选项
    handleSelectItem (path, fullPath) {
      const { getCurrentRoute, getPathTitle, $router, updateActiveMenu } = this
      if (getCurrentRoute === path) {
        return
      }
      $router.push(path)
      const menuTitle = getPathTitle(path)
      updateActiveMenu({ title: menuTitle, path })
    },
    // 获取路由标题
    getPathTitle (path) {
      const { menuList } = this
      for (const item of menuList) {
        const index = item.subMenu.findIndex(v => v.path === path)
        if (index > -1) {
          return item.subMenu[index].title
        }
      }
    }
  }
}
</script>

<style lang="scss">
.menu-wrap{
  width: $menuHoverWidth;
  height: 100%;
  .el-menu{
    border-right: 0;
    background: transparent;
    // .menu-title,
    // .el-menu-item{
    //   color: #fff;
    // }
    .el-submenu__title{
      i::before{
        color: #fff;
      }
    }
    .el-menu--inline{
      display: none;
    }
    .el-menu-item{
      // height: 40px;
      // line-height: 40px;
      padding-left: $menuWidth !important;
    }
    .el-submenu__title:hover,
    .el-menu-item:hover{
      // background: #58697c;
    }
    .el-menu-item.is-active{
      border-right: 1px solid #fff;
      // background: #6d819a;
    }
  }
  .menu-icon{
    display: inline-block;
    width: 16px;
    height: 16px;
    background-size: 100%;
  }
  .menu-title{
    margin-left: 16px;
  }
  &:hover{
    .el-menu--inline{
      display: block;
    }
  }
}
</style>
