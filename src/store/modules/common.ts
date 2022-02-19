import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from '@/store';

export interface ICommonState {
  counter: number;
}

@Module({
  name: 'common',
  dynamic: true,
  store,
})
class ComonStore extends VuexModule implements ICommonState {
  counter = 0;

  @Mutation
  setCounter(payload: number) {
    this.counter += payload;
  }

  @Action
  async setCounterAsync(payload: number) {
    // 模拟异步
    const sleep = (sec: number) =>
      new Promise(resolve => setTimeout(resolve, sec * 1000));
    await sleep(1);
    this.setCounter(payload);
  }
}

export const ComonModule = getModule(ComonStore);
