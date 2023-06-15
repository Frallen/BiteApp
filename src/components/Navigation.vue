<template>
  <div class="navbar">
    <div class="navbar-logo">
      <div class="pic">
        <img src="/images/logo.png">
      </div>
      <a href="/">Энергия</a>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 23px;
  border-bottom: 1px solid #eee;
  height: 10vh;
  background: #fff;
  &-logo {
    display: flex;
    align-items: center;

    a {
      margin: 0 0 0 12px;
      font-weight: 600;
      font-size: 20px;
      line-height: 23px;
      text-decoration: none;
      color: #000;
    }
  }
}
</style>