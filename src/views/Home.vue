<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <div class="container-wrap">
      <div class="value-wrap">{{ getCounter }}</div>
      <button @click="handleAdd">add counter</button>
      <button @click="handleAddAsync">add counter async</button>
      <input type="file" @change="getFile" />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
  import { ComonModule } from '@/store/modules/common';
  import { apiGetData, apiGetDataPost, apiUpload } from '@/api';

  @Component({
    components: {
      HelloWorld,
    },
  })
  export default class Home extends Vue {
    get getCounter(): number {
      return ComonModule.counter;
    }
    handleAdd(): void {
      ComonModule.setCounter(1);
    }
    handleAddAsync(): void {
      ComonModule.setCounterAsync(1);
    }
    async init() {
      const { code, data, message, success } = await apiGetData({
        data: 'test data',
      });
      console.log(
        'code, data, message, success: ',
        code,
        data,
        message,
        success
      );
      if (!success) return;
      console.log(`请求成功，返回的数据是： ${data}`);
    }
    async init1() {
      const { code, data, message, success } = await apiGetDataPost({
        data: 'test data',
      });
      console.log(
        'code, data, message, success: ',
        code,
        data,
        message,
        success
      );
      if (!success) return;
      console.log(`请求成功，返回的数据是： ${data}`);
    }
    async getFile(e: Event) {
      console.log('e: ', e);
      const { files } = e.target as any;
      console.log('files: ', files);
      const formData = new FormData();
      formData.append('file', files[0]);
      const { code, data, message, success } = await apiUpload(formData);
      console.log(
        'code, data, message, success: ',
        code,
        data,
        message,
        success
      );
      if (!success) return;
      console.log(`请求成功，返回的数据是： ${data}`);
    }
    mounted() {
      // this.init();
      this.init1();
      console.log('env--->', process.env);
      this.$message({
        message: '恭喜你，这是一条成功消息',
        type: 'success',
      });
    }
  }
</script>
