<template>
  <Line :data="Graph"
        :options="Options"
  />
</template>

<script setup lang="ts">
import {Line} from 'vue-chartjs'
const {Graph} = storeToRefs(useMain())
Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
const Options = reactive({
  responsive: true,
  borderColor: '#005FB8',
  color: '#005FB8',
  maintainAspectRatio: false,

})

</script>

<style scoped lang="less">

</style>