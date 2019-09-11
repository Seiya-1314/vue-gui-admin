<template>
  <el-breadcrumb
    class="app-breadcrumb"
    separator="/"
  >
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbList"
        :key="item.path"
      >
        <span
          v-if="index === breadcrumbList.length - 1"
          class="no-redirect"
        >{{ item.meta.title }}</span>
        <a
          v-else
          @click="$parent.$router.push(item.path)"
        >{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { Route, RouteRecord } from 'vue-router';

@Component({
  name: 'Breadcrumb'
})
export default class extends Vue {
  private breadcrumbList!: RouteRecord[];

  constructor() {
    super();
    this.breadcrumbList = [];
  }

  @Watch('$route')
  private onRouteChange(route: Route) {
    this.getBreadcrumbs();
  }

  created() {
    this.getBreadcrumbs();
  }

  private getBreadcrumbs() {
    const guideRoute = [
      { path: '/guide', meta: { title: '首页' } } as RouteRecord
    ];
    let matched = this.$route.matched.filter(
      item => item.meta && item.meta.title
    );
    const firstRoute = matched[0];

    if (!this.isGuideRoute(firstRoute)) {
      matched = guideRoute.concat(matched);
    }
    this.breadcrumbList = matched.filter(item => {
      return item.meta && item.meta.title;
    });
  }

  private isGuideRoute(route: RouteRecord) {
    const routeName = route && route.name;
    if (!routeName) {
      return false;
    }
    return routeName.trim().toLocaleLowerCase() === 'Guide'.toLocaleLowerCase();
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}

.app-breadcrumb,
.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
