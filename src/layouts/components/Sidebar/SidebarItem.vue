<template>
  <div>
    <el-menu-item
      v-if="!menuInfo.children"
      :key="menuInfo.path"
      :index="menuInfo.path"
      :class="{'submenu-title-noDropdown': true}"
      @click="selectedMenu(menuInfo.path)"
    >
      <svg-icon
        v-if="menuInfo.meta.icon"
        :icon-class="menuInfo.meta.icon"
      />
      <span
        v-if="menuInfo.meta.title"
        slot="title"
      >{{ menuInfo.meta.title }}</span>
    </el-menu-item>
    <el-submenu
      v-else
      index="2"
      popper-append-to-body
    >
      <template slot="title">
        <svg-icon :icon-class="menuInfo.meta.icon" />
        <span slot="title">{{ menuInfo.meta.title }}</span>
      </template>
      <template v-for="item in menuInfo.children">
        <el-menu-item
          v-if="!item.children"
          :key="item.path"
          :index="item.path"
          @click="() => $parent.$router.push(item.path)"
        >
          <svg-icon
            v-if="item.meta.icon"
            :icon-class="item.meta.icon"
          />
          <span slot="title">{{ item.meta.title }}</span>
        </el-menu-item>
        <SidebarItem
          v-else
          :key="item.path"
          :menu-info="item"
        />
      </template>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';

@Component({
  name: 'SidebarItem'
})
export default class extends Vue {
  @Prop({ required: true })
  private menuInfo!: RouteConfig;

  private selectedMenu(path: string) {
    if (path === this.$route.path) {
      return;
    }
    this.$router.push(path);
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  margin-right: 16px;
}
.simple-mode {
  .svg-icon {
    margin-left: 20px;
  }
}
</style>
