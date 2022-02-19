import Vue from 'vue';
import VueRouter, { Route, RouteConfig, NavigationGuardNext } from 'vue-router';
// 进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import baseRoute from './modules/base';

// https://www.npmjs.com/package/nprogress
NProgress.configure({ showSpinner: false });

Vue.use(VueRouter);

// 去除路由重复的报错行为
const VueRouterPush: any = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to: any) {
  return VueRouterPush.call(this, to).catch((err: any) => err);
};
const VueRouterReplace: any = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location: any) {
  return VueRouterReplace.call(this, location).catch((err: any) => err);
};

const routes: Array<RouteConfig> = [...baseRoute];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
  NProgress.start();
  // 动态更改网页 title
  document.title = to.meta?.title || document.title;
  next();
});

router.afterEach((to: Route) => {
  NProgress.done();
});

export default router;
