<template>
  <div class="tags-view-container">
    <ScrollPanel class="tags-view-wrapper">
      <div
        v-for="item in visitedViews"
        :key="item.path"
        :class="isActiveTag(item) ? 'active' : ''"
        class="tags-view-item"
        @click="selectTag(item.path)"
        @click.middle="closeSelectedTag(item)"
        @contextmenu.prevent="openMenu(item, $event)"
      >
        {{ item.meta.title }}
        <span
          v-if="!item.meta.affix"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(item)"
        />
      </div>
    </ScrollPanel>
    <ul
      v-show="menuVisible"
      :style="{left: left + 'px', top: top + 'px'}"
      class="context-menu"
    >
      <li @click="refreshSelectedTag(selectedTag)">
        刷新
      </li>
      <li
        v-if="!(selectedTag.meta && selectedTag.meta.affix)"
        @click="closeSelectedTag(selectedTag)"
      >
        关闭
      </li>
      <li @click="closeOthersTags">
        关闭其它
      </li>
      <li @click="closeAllTags()">
        关闭所有
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Inject } from 'vue-property-decorator';

import ScrollPanel from './ScrollPanel.vue';
import { TagsViewModule, TagView } from '@/store/modules/tags-view';
import { newRouteConfig } from '@/router';

@Component({
  name: 'TagsView',
  components: {
    ScrollPanel
  }
})
export default class extends Vue {
  private menuVisible: boolean;
  private top: number;
  private left: number;
  private affixTags: newRouteConfig[];
  private routes: newRouteConfig[];
  private selectedTag: TagView;

  constructor() {
    super()
    this.menuVisible = false;
    this.top = 0;
    this.left = 0;
    this.affixTags = [];
    this.routes = [];
    this.selectedTag = {};
  }

  get visitedViews() {
    return TagsViewModule.visitedViews;
  }

  @Inject('reload')
  private reload: any;

  @Watch('$route.path')
  private onRoutePathChange() {
    this.addTag();
  }

  @Watch('menuVisible')
  private onVisibleChange(value: boolean) {
    if (value) {
      document.body.addEventListener('click', this.closeMenu)
    } else {
      document.body.removeEventListener('click', this.closeMenu)
    }
  }

  mounted() {
    this.initTag();
    this.addTag();
  }

  private initTag(): void {
    this.getRoutes();
    this.affixTags = this.filterAffixTag(this.routes);

    for (const route of this.affixTags) {
      if (route.name) {
        TagsViewModule.addVisitedView(route);
      }
    }
  }

  private addTag(): boolean {
    const { name } = this.$route;
    if (name) {
      TagsViewModule.addView(this.$route)
    }

    return false;
  }

  private getRoutes() {
    const router = this.$router as any;
    this.routes = router.options.routes as newRouteConfig[];
  }

  private filterAffixTag(routes: newRouteConfig[]): newRouteConfig[] {
    let tag: newRouteConfig[] = [];
    routes.forEach(route => {
      if (route.meta && route.meta.affix) {
        tag.push(route)
      }

      if (route.children) {
        const childrenTag = this.filterAffixTag(route.children);
        if (childrenTag) {
          tag = [...tag, ...childrenTag]
        }
      }
    });

    return tag;
  }

  private isActiveTag(tag: TagView): boolean {
    return this.$route.path === tag.path;
  }

  private selectTag(path: string) {
    if (this.$route.path === path) return;
    this.$parent.$router.push(path)
  }

  private refreshSelectedTag(tag: TagView) {
    if (this.$route.path === tag.path) {
      this.reload();
      return;
    }
    this.$parent.$router.push(tag);
  }

  private closeSelectedTag(tag: TagView) {
    TagsViewModule.delView(tag);
    if (this.isActiveTag(tag)) {
      this.toLastView();
    }
  }

  private closeOthersTags() {
    TagsViewModule.delOthersViews(this.selectedTag);
    if (this.selectedTag.path !== this.$route.path) this.$parent.$router.push(this.selectedTag);
  }

  private closeAllTags() {
    TagsViewModule.delAllViews();
    if (this.affixTags.some(item => item.path === this.$route.path)) {
      return;
    }
    this.toLastView();
  }

  private closeMenu() {
    this.menuVisible = false;
  }

  private toLastView(): void {
    const latestView = TagsViewModule.visitedViews.slice(-1)[0];
    if (latestView) {
      this.$router.push(latestView);
    } else {
      this.$router.push('/');
    }
  }

  private openMenu(tag: TagView, event: MouseEvent) {
    const menuMinWidth = 105;
    const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
    const offsetWidth = (this.$el as HTMLElement).offsetWidth; // container width
    const maxLeft = offsetWidth - menuMinWidth; // left boundary
    const left = event.clientX - offsetLeft + 15; // 15: margin right
    if (left > maxLeft) {
      this.left = maxLeft;
    } else {
      this.left = left;
    }
    this.top = event.clientY;
    this.menuVisible = true;
    this.selectedTag = tag;
  }
}
</script>

<style lang="scss">
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 10px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .context-menu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
