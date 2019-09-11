<template>
  <div :class="{'has-logo': showLogo}">
    <SidebarLogo
      v-if="showLogo"
      :collapse="isCollapse"
    />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="defaultIndex"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="item in menuList"
          :key="item.path"
          :menu-info="item"
          :class="['menu-wrapper', isCollapse ? 'simple-mode' : 'full-mode', {'first-level': isFirstLevel}]"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { newRouteConfig } from '@/router/index';

import SidebarLogo from './SidebarLogo.vue';
import SidebarItem from './SidebarItem.vue';
import variables from '@/styles/_variables.scss';
import { AppModule } from '@/store/modules/app';

@Component({
  name: 'Sidebar',
  components: {
    SidebarLogo,
    SidebarItem
  }
})
export default class extends Vue {
  private showLogo = true;
  private isFirstLevel = true;
  private variables = variables;

  get sidebar() {
    return AppModule.sidebar;
  }

  get isCollapse() {
    return !this.sidebar.opened;
  }

  get defaultIndex() {
    if (this.$route.path) {
      return this.$route.path;
    }
    return '/guide';
  }

  get menuList() {
    return this.getMenuData(this.getRoutes(this.$router) as any);
  }

  private getRoutes(router: any) {
    return (router.options && router.options.routes) || [];
  }

  private getMenuData(routes: newRouteConfig[] = []): Array<any> {
    const menuData = [];

    for (let item of routes) {
      /* 权限不足时，隐藏菜单 */
      // if (item.meta && item.meta.authority && !check(item.meta.authority)) {
      //   break;
      // }

      if (item.name && !item.hideInMenu) {
        const newItem = { ...item };
        delete newItem.children;
        if (item.children && !item.hideChildrenMenu) {
          newItem.children = this.getMenuData(item.children);
        } else {
          this.getMenuData(item.children);
        }
        menuData.push(newItem);
      } else if (!item.hideInMenu && !item.hideChildrenMenu && item.children) {
        menuData.push(...this.getMenuData(item.children));
      }
    }

    return menuData;
  }
}
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }
  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }
  .el-scrollbar__view {
    height: 100%;
  }
  .el-scrollbar__bar {
    & .is-vertical {
      right: 0px;
    }
    & .is-horizontal {
      display: none;
    }
  }
}
.full-mode {
  .nest-menu .el-submenu > .el-submenu__title,
  .el-submenu .el-menu-item {
    min-width: $sidebarWidth !important;
    background-color: $subMenuBg !important;
    &:hover {
      background-color: $subMenuHover !important;
    }
  }
}
.simple-mode {
  .submenu-title-noDropdown {
    padding: 0 !important;
    position: relative;
    .el-tooltip {
      padding: 0 !important;
    }
  }
  .el-submenu {
    overflow: hidden;
    & > .el-submenu__title {
      padding: 0px !important;
      .el-submenu__icon-arrow {
        display: none;
      }
      & > span {
        visibility: hidden;
      }
    }
  }
}
.el-submenu .is-active > .el-submenu__title {
  color: $subMenuActiveText !important;
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}
.has-logo {
  .el-scrollbar {
    height: calc(100% - 50px);
  }
}
.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
