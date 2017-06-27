<template>
  <div>
    <h1 class="count">{{count}}</h1>
  </div>
</template>

<script>
  export default {
    props: {
      count: Number
    }
  }
</script>

<style lang="scss" scoped>
  .count {
    color: #FFF;
    font-size: 32px;
  }
</style>
