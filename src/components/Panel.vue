<template>
  <div class="panel">
    <div class="panel-nav">
      <div class="panel-nav-item" :class="{'panel-nav-active':ActiveNav===item.id}" v-for="item in paths" :key="item.id"
           @click.stop="ActiveNav=item.id">
        <div class="pic"><img :src='`/public/images/${item.Icon}`' alt=""></div>
        {{ item.Title }}
      </div>
    </div>
    <div class="panel-space">

      <div class="settings-open"><img :src='`/public/images/settings.svg`' alt=""></div>
      <div class="panel-space">


      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

const ActiveNav = ref<number>()

import {panelNavigationType} from "../types/global.types";

const paths: panelNavigationType[] = [
  {
    id: 1,
    Title: "Панель",
    Icon: "menu.svg"
  },
  {
    id: 2,
    Title: "Кошелек",
    Icon: "logo.png"
  },
  {
    id: 3,
    Title: "Настройки",
    Icon: "settings.svg"
  }
]

</script>
<style scoped lang="less">
.panel {
  display: flex;
  height: 90vh;

  &-nav {
    width: 20%;
    padding: 34px 0;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.07);
    height: 100%;

    &-item {
      display: flex;
      align-items: center;
      margin: 20px 0 0 0;
      cursor: pointer;
      padding: 11px 34px;

      .pic {
        width: 26px;
        height: 26px;
        min-height: 26px;
        min-width: 26px;
        display: block;
        margin: 0 26px 0 0;

        img {
          width: 100%;
          height: 100%;
        }
      }

      font-weight: 400;
      font-size: 20px;
      line-height: 120%;
      color: #000000;
    }

    &-item:first-child {
      margin: 0;
    }

    &-active {
      border-left: 2px solid #005FB8;
      color: @blue;
      background: @lightblue;
    }
  }

  &-space {
    width: 80%;
    position: relative;
    background: @lightblue;

    .settings-open {
      position: absolute;
      right: 3%;
      top: 5%;
      cursor: pointer;
      width: 29px;
      height: 29px;
      min-width: 29px;
      min-height: 29px;
      .trs(0.3s);
    }

    .settings-open:hover {
      filter: invert(20%) sepia(51%) saturate(4584%) hue-rotate(197deg) brightness(97%) contrast(101%);
      .trs(0.3s);
    }

  }
}
</style>