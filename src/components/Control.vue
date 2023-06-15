<template>
  <div class="circle">
    <div class="circle-body" :class="{'active':isChanged}">
      <div class="title">
        Цена
      </div>
      <div class="price">
        {{ Control.currentValue.toFixed(2) }}
        <span>
        руб./кВт*ч
        </span>
      </div>
    </div>
    <div class="circle-footer">
      50 руб./кВт*ч
      <br>
      План
    </div>
  </div>
</template>

<script setup lang="ts">
const {Control} = storeToRefs(useMain())

const isChanged = ref<boolean>(false)


watchEffect(() => {
      if (Control.value.currentValue < Control.value.minValue || Control.value.currentValue > Control.value.maxValue) {

        isChanged.value = true
        setTimeout(() => {
          isChanged.value = false
        }, 5000)
      }
    },
)

</script>

<style scoped lang="less">
.circle {
  width: 252px;
  background: #FFFFFF;
  border: 1px solid @blue;
  .br(100%);
  overflow: hidden;
  @media @lg {
    width: 200px;
  }

  &-body {

    padding: 30px 0 37px;
    text-align: center;
    @media @lg {
      padding: 10px 0 17px;
    }

    .title {
      color: @blue;
      font-size: 1em;
      margin: 0 0 20px 0;
    }

    .price {
      font-size: 3em;

      span {
        display: block;
        font-size: 15px;
      }
    }
  }

  &-footer {
    background: @blue;
    text-align: center;
    padding: 13px 0;
    font-size: 1em;
    color: #fff;
  }

}

.active {
  animation: flash 0.9s linear infinite;
}

@keyframes flash {
  from {
    background: #fff;
  }
  to {
    background: @blue;
    color: #fff;
  }
}
</style>