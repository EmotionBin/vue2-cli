import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
// 进度条
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
import baseRoute from './modules/base';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [...baseRoute];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
