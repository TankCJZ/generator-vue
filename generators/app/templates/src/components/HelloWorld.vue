<template>
  <div class="hello">{{msg}}</div>
</template>

<script>
export default {
  props: {
    msg: String
  }
}
</script>

<style scoped>
  .hello {
    font-size: 24px;
  }
</style>