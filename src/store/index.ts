import Vue from 'vue';
import Vuex from 'vuex';
import { ICommonState } from './modules/common';

Vue.use(Vuex);

export interface IRootState {
  common: ICommonState;
}

export default new Vuex.Store<IRootState>({});
