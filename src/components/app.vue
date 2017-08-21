<template>
  <div class="app">
    <counter :count="count"></counter>
    <button class="increment" @click="increment">incrémenter</button>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Counter from './counter';

  export default {
    components: {Counter},
    data () {
      return {
        count: 0
      }
    },
    methods: {
      increment() {
        return this.count++;
      }
    }
  }
</script>

<style lang="scss">
  .app {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .increment {
      background: #FFF;
      padding: 10px 20px;
      border: none;
      color: #000;
      border-radius: 3px;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
    }
  }
</style>

