<template>
  <div
    :class="wrapperClass"
    class="app-wrapper"
  >
    <div
      v-if="wrapperClass.mobile && sidebar.opened"
      class="mask"
      @click="closeMask"
    />
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <div
        :class="{'fixed-header': fixedHeader}"
        class="app-header"
      >
        <Navbar />
      </div>
      <router-view>app-main</router-view>
      <!-- <right-panel v-if="showSettings">setting</right-panel> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Sidebar from './components/Sidebar/Sidebar.vue';
import Navbar from '@/layouts/components/Navbar.vue';

import { DeviceType, AppModule } from '@/store/modules/app';

@Component({
  name: 'Layout',
  components: {
    Sidebar,
    Navbar
  }
})
export default class extends Vue {
  private fixedHeader: boolean;

  constructor() {
    super();
    this.fixedHeader = false;
  }

  get device() {
    return AppModule.device;
  }

  get sidebar() {
    return AppModule.sidebar;
  }

  get wrapperClass() {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
      mobile: this.device === DeviceType.Mobile
    };
  }

  private closeMask() {
    AppModule.CloseSideBar(false);
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.mask {
  z-index: 999;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.3;
}
.sidebar-container {
  position: fixed;
  z-index: 1001;
  top: 0;
  left: 0;
  bottom: 0;
  width: $sidebarWidth !important;
  height: 100%;
  font-size: 0;
  overflow: hidden;
  transition: width 0.38s;
}
.main-container {
  position: relative;
  margin-left: $sidebarWidth;
  min-height: 100%;
  transition: margin-left 0.38s;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sidebarWidth});
  transition: width 0.28s;
}
.hideSidebar {
  .main-container {
    margin-left: 54px;
  }
  .sidebar-container {
    width: 54px !important;
  }
  .fixed-header {
    width: calc(100% - 54px);
  }
}
/* for mobile response 适配移动端 */
.mobile {
  .main-container {
    margin-left: 0px;
  }
  .sidebar-container {
    transition: transform 0.28s;
    width: $sidebarWidth !important;
  }
  & .openSidebar {
    position: fixed;
    top: 0;
  }
  & .hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-$sidebarWidth, 0, 0);
    }
  }
  .fixed-header {
    width: 100%;
  }
}
.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
