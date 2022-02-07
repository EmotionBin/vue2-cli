<template>
  <div class="home-wrap">
    <div class="home-head">
      <Head/>
    </div>
    <div class="home-body">
      <div class="body-menu">
        <Menu/>
      </div>
      <div class="body-content">
        <div class="content-head">
          {{ getCurrentTitle }}
        </div>
        <div class="content-view-wrap">
          <div class="content-view">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from './components/head/index.vue'
import Menu from '@/components/menu/index.vue'
import menuList from '@/data/menu/index.js'

export default {
  name: 'homeIndex',
  data () {
    return {
    }
  },
  components: {
    Head,
    Menu
  },
  computed: {
    getCurrentRoute () {
      return this.$route.path
    },
    getCurrentTitle () {
      for (const item of menuList) {
        const { title } = item
        const index = item.subMenu.findIndex(v => v.path === this.getCurrentRoute)
        if (index > -1) {
          const subTitle = item.subMenu[index].title
          return `${title} | ${subTitle}`
        }
      }
      return ''
    }
  },
  created () {
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
$viewHeadHeight:40px;

.home-wrap{
  height: 100%;
  .home-body{
    position: relative;
    height: calc(100% - #{$navHeight});
    background-color: #eaecee;
    overflow: hidden;
    .body-menu{
      position: absolute;
      left: 0;
      top: 0;
      width: $menuWidth;
      height: 100%;
      // background: linear-gradient(#547091,#696d7a);
      cursor: pointer;
      overflow: hidden;
      z-index: 2000;
      &:hover{
        width: $menuHoverWidth;
      }
    }
    .body-content{
      width: 100%;
      height: 100%;
      padding-left: $menuWidth;
      @include common-box-shadow;
    }
    .content-head{
      height: $viewHeadHeight;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 20px;
      // background-color: #fff;
      // color: #606266;
      // @include common-box-shadow(#999);
    }
    .content-view-wrap{
      height: calc(100% - #{$viewHeadHeight});
      padding: 20px;
    }
    .content-view{
      height: 100%;
      // background-color: #fff;
      @include common-box-shadow;
    }
  }
}
</style>
