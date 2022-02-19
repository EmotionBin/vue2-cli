<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <div class="container-wrap">
      <div class="value-wrap">{{ getCounter }}</div>
      <button @click="handleAdd">add counter</button>
      <button @click="handleAddAsync">add counter async</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
  import { ComonModule } from '@/store/modules/common';

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
  }
</script>
