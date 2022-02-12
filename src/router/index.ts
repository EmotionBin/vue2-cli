import Vue from 'vue';
import VueRouter, { Route, RouteConfig, NavigationGuardNext } from 'vue-router';
// 进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import baseRoute from './modules/base';

// https://www.npmjs.com/package/nprogress
NProgress.configure({ showSpinner: false });

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [...baseRoute];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
  NProgress.start();
  document.title = to.meta?.title || document.title;
  next();
});

router.afterEach((to: Route) => {
  NProgress.done();
});

export default router;
