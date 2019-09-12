<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.native.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'ScrollPanel'
})
export default class extends Vue {
  private handleScroll(e: MouseWheelEvent) {
    const eventDelta = (e as any).wheelDelta || -e.deltaY * 40
    const scrollContainer = this.$refs.scrollContainer as Vue
    const scrollWrapper = scrollContainer.$refs.wrap as HTMLElement
    scrollWrapper.scrollLeft = scrollWrapper.scrollLeft + eventDelta / 4
  }
}
</script>

<style lang="scss">
.scroll-container {
  .el-scrollbar__bar {
    bottom: 0px;
  }
  .el-scrollbar__wrap {
    height: 49px;
  }
}
</style>

<style lang="scss" scoped>
.scroll-container {
  position: relative;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
}
</style>
