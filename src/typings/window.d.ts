import VueRouter from 'vue-router';
import { Store } from 'vuex';
import { CreateElement } from 'vue';

declare global {
  export interface Window {
    $router: VueRouter;
    $store: Store<any>;
    $createElement: CreateElement;
  }
}
