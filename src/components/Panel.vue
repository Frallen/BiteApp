<template>
  <div class="panel">
    <div class="panel-nav" :class="{'visible':isMobile}">
      <div class="panel-nav-item" :class="{'panel-nav-active':ActiveNav===item.id}" v-for="item in Paths"
           :key="item.id"
           @click.stop="ActiveNav=item.id">
        <div class="pic"><img :src='`/images/${item.Icon}`' alt=""></div>
        {{ item.Title }}
      </div>
    </div>
    <div class="mobile-open" @click.stop="isMobile?isMobile=false:isMobile=true">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
        <path fill="currentColor" d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"/>
      </svg>
    </div>


    <div class="panel-space">
      <div v-for="item in 4" :key="item" class="panel-space-item"
           @dragover.prevent
           @dragenter.prevent
           @drop="drop"
      ></div>
      <div class="settings-open" @click.stop="stateWidgetPanel?stateWidgetPanel=false:stateWidgetPanel=true">
        <img
            :src='`/images/settings.svg`' alt="">
      </div>
      <transition name="fade">
        <div class="panel-space-modal" v-show="stateWidgetPanel">
          <div class="widget-wrapper"
               @dragover.prevent
               @dragenter.prevent
               @drop="drop">
            <Control class="widget-wrapper-item" draggable="true"
                     @dragstart="startDrag"
                     id="1"
            ></Control>
            <div class="widget-wrapper-item">
              <div class="lineChart" draggable="true"
                   @dragstart="startDrag"
                   id="2"
              >
                <LineChart></LineChart>
              </div>
            </div>
            <div class="widget-wrapper-item">
              <div class="table" @dragstart="startDrag" draggable="true"
                   id="3"
              >
                <Table></Table>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script setup lang="ts">
const ActiveNav = ref<number>()
const stateWidgetPanel = ref<boolean>(false)
const {Paths} = storeToRefs(useMain())
const {getControl, getGraph, getTableData} = (useMain())
const isMobile = ref<boolean>(false)

watch(isMobile, () => {
  isMobile.value ? overFlow(true) : overFlow(false)
})

setInterval(async () => {
  await getControl()
}, 5000)
setInterval(async () => {
  await getGraph()
  await getTableData()
}, 60000)
await getTableData()
await getControl()
await getGraph()

const draggedElement = ref<HTMLElement>();

const startDrag = (e: Event) => {
  draggedElement.value = e.currentTarget as HTMLElement
}
const drop = (e: Event) => {
  (e.currentTarget as HTMLElement).appendChild(draggedElement.value as HTMLElement);
};
</script>
<style scoped lang="less">
.panel {
  display: flex;
  height: 90vh;
  position: relative;
  overflow: auto;

  &-nav {
    width: 20%;
    padding: 34px 0;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.07);
    height: 100%;
    background: #fff;
    @media @lg {
      width: auto;
      position: fixed;
      left: 0;
      top: 0;
      height: 100vh;
      z-index: -5;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;

    }

    &-item {
      display: flex;
      align-items: center;
      margin: 20px 0 0 0;
      cursor: pointer;
      padding: 11px 34px;
      @media @lg {
        padding: 11px 18px;
      }

      .pic {
        width: 26px;
        height: 26px;
        min-height: 26px;
        min-width: 26px;
        display: block;
        margin: 0 26px 0 0;
        @media @lg {
          margin: 0 15px 0 0;
        }

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
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows:1fr 1fr;
    @media @lg {
      width: 100%;
    }

    &-item {
      border: 1px dashed @blue;
    }

    &-modal {
      position: absolute;
      right: 3%;
      top: 10%;
      background: #FFFFFF;
      border: 1px solid rgba(0, 95, 184, 0.5);
      .br(20px);
      z-index: 2;
      padding: 21px 17px;

      .widget-wrapper {
        min-height: 400px;
        width: 296px;
        height: fit-content;
        overflow: hidden auto;
        padding: 5px;
        @media @lg {
          min-height: 300px;
          width: 196px;
        }

        &-item {
          margin: 1em 0 0;
        }

        &-item:first-child {
          margin: 0;
        }
      }

      .widget-wrapper::-webkit-scrollbar-thumb {
        background: @blue;
        .br(20px)
      }

      .widget-wrapper::-webkit-scrollbar-track {
        background-color: transparent;
      }

      .widget-wrapper::-webkit-scrollbar {
        width: 5px;
      }
    }


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
      z-index: 2;
    }

    .settings-open:hover {
      filter: invert(20%) sepia(51%) saturate(4584%) hue-rotate(197deg) brightness(97%) contrast(101%);
      .trs(0.3s);
    }

  }
}
.panel::-webkit-scrollbar-thumb {
  background: @blue;
  .br(20px)
}

.panel::-webkit-scrollbar-track {
  background-color: transparent;
}

.panel::-webkit-scrollbar {
  width: 5px;
}
.mobile-open {
  position: absolute;
  left: 0;
  top: 50%;
  z-index: -2;
  background: #fff;
  height: 60px;
  width: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  transform: rotate(48deg) translateX(-79%);
  cursor: pointer;
  .br(10px);

  svg {
    transform: rotate(316deg);
  }

  @media @lg {
    z-index: 4;
  }
}

.visible {
  z-index: 2;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}

.lineChart {
  height: 200px;
}

.table {
  height: 200px;
}

</style>