import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators';
import store from '@/store';
import { Route } from 'vue-router';
import { newRouteConfig } from '@/router';

export interface TagView extends Partial<Route> {
  title?: string;
}

export interface TagsViewState {
  visitedViews: TagView[];
  cachedViews: (string | undefined)[];
}

@Module({ dynamic: true, store, name: 'tags-view' })
class TagsView extends VuexModule implements TagsViewState {
  public visitedViews: TagView[] = [];
  public cachedViews: (string | undefined)[] = [];

  @Mutation
  private ADD_VISITED_VIEW(route: newRouteConfig) {
    if (this.visitedViews.some(item => item.path === route.path)) return;
    this.visitedViews.push(
      Object.assign({}, route, {
        title: route.meta.title || 'no-name'
      })
    );
  }

  @Mutation
  private ADD_CACHED_VIEW(route: newRouteConfig) {
    if (this.cachedViews.includes(route.name)) return;
    if (route.meta.cache) {
      this.cachedViews.push(route.name);
    }
  }

  @Mutation
  private DEL_VISITED_VIEW(route: TagView) {
    for (const [index, value] of Object.entries(this.visitedViews)) {
      if (value.path === route.path) {
        this.visitedViews.splice(parseInt(index), 1);
        break;
      }
    }
  }

  @Mutation
  private DEL_CACHED_VIEW(route: TagView) {
    for (const [index, value] of Object.entries(this.cachedViews)) {
      if (value === route.name) {
        this.cachedViews.splice(parseInt(index), 1);
        break;
      }
    }
  }

  @Mutation
  private DEL_OTHERS_VISITED_VIEWS(route: TagView) {
    this.visitedViews = this.visitedViews.filter(view => {
      return view.meta.affix || view.path === route.path;
    });
  }

  @Mutation
  private DEL_OTHERS_CACHED_VIEWS(route: TagView) {
    for (const [index, value] of Object.entries(this.cachedViews)) {
      if (value === route.name) {
        this.cachedViews = this.cachedViews.slice(
          parseInt(index),
          parseInt(index) + 1
        );
        break;
      }
    }
  }

  @Mutation
  private DEL_ALL_VISITED_VIEWS() {
    const affixTags = this.visitedViews.filter(view => view.meta.affix);
    this.visitedViews = affixTags;
  }

  @Mutation
  private DEL_ALL_CACHED_VIEWS() {
    this.cachedViews = [];
  }

  @Mutation
  private UPDATE_VISITED_VIEW(route: newRouteConfig) {
    for (let value of this.visitedViews) {
      if (value.path === route.path) {
        value = Object.assign(value, route);
        break;
      }
    }
  }

  @Action
  public addVisitedView(route: newRouteConfig) {
    this.ADD_VISITED_VIEW(route);
  }

  @Action
  public addView(route: newRouteConfig) {
    this.ADD_VISITED_VIEW(route);
    this.ADD_CACHED_VIEW(route);
  }

  @Action
  public delView(route: TagView) {
    this.DEL_VISITED_VIEW(route);
    this.DEL_CACHED_VIEW(route);
  }

  @Action
  public delCachedView(route: TagView) {
    this.DEL_CACHED_VIEW(route);
  }

  @Action
  public delOthersViews(route: TagView) {
    this.DEL_OTHERS_VISITED_VIEWS(route);
    this.DEL_OTHERS_CACHED_VIEWS(route);
  }

  @Action
  public delAllViews() {
    this.DEL_ALL_VISITED_VIEWS();
    this.DEL_ALL_CACHED_VIEWS();
  }

  @Action
  public delAllCachedViews() {
    this.DEL_ALL_CACHED_VIEWS();
  }

  @Action
  public updateVisitedView(route: newRouteConfig) {
    this.UPDATE_VISITED_VIEW(route);
  }
}

export const TagsViewModule = getModule(TagsView);
