<template>
  <EasyDataTable
      :headers="Table.header"
      :items="Table.body"
  />
</template>

<script setup lang="ts">
const {Table} = storeToRefs(useMain())
</script>

<style scoped lang="less">
</style>