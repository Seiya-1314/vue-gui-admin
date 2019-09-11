<template>
  <div
    class="right-panel-container"
    :class="{'show-panel': panelVisiable}"
  >
    <div
      class="mask"
      @click="panelVisiable = !panelVisiable"
    />
    <div class="right-panel">
      <div
        class="right-panel-button"
        :style="{'top': buttonTop + 'px','background-color': panelTheme}"
        @click="panelVisiable = !panelVisiable"
      >
        <i :class="panelVisiable ? 'el-icon-close' :' el-icon-setting'" />
      </div>
      <div class="right-panel-item">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import elementVariables from '@/styles/element-variables.scss';

@Component({
  name: 'RightPanel'
})
export default class extends Vue {
  private panelVisiable: boolean;
  private panelTheme: string;

  @Prop({ default: 250 })
  private buttonTop!: number;

  constructor() {
    super();
    this.panelVisiable = false;
    this.panelTheme = elementVariables.theme;
  }
}
</script>

<style lang="scss">
.show-right-panel {
  overflow: hidden;
  position: relative;
  width: calc(100% - 15px);
}
</style>

<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  background: rgba(0, 0, 0, 0.2);
  z-index: -1;
}
.right-panel {
  width: 100%;
  max-width: 260px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translate(100%);
  background: #fff;
  z-index: 40000;
}
.show-panel {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  .mask {
    z-index: 20000;
    opacity: 1;
    width: 100%;
    height: 100%;
  }
  .right-panel {
    transform: translate(0);
  }
}
.right-panel-button {
  width: 48px;
  height: 48px;
  position: absolute;
  left: -48px;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 0;
  cursor: pointer;
  pointer-events: auto;
  color: #fff;
  line-height: 48px;

  i {
    font-size: 24px;
    line-height: 48px;
  }
}
</style>
