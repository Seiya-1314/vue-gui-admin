import {
  VuexModule,
  Action,
  Mutation,
  getModule,
  Module
} from 'vuex-module-decorators';

import store from '@/store';
import { getToken, setToken, removeToken } from '@/utils/auth';
import userService from '@/api/user';
import { TagsViewModule } from './tags-view';

export interface UserState {
  token: string;
  name: string;
  avatar: string;
  authority: string[];
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements UserState {
  public token = getToken() || '';
  public name = '';
  public avatar = '';
  public authority: string[] = [];

  @Mutation
  private SET_TOKEN(token: string) {
    setToken(token); // 将 token 保存到 cookie 中
    this.token = token; // 将 token 保存到 State 中
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name;
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar;
  }

  @Mutation
  private SET_AUTHORITY(authority: string[]) {
    this.authority = authority;
  }

  @Action
  public async login(userInfo: { username: string; password: string }) {
    let { username, password } = userInfo;
    const { data } = await userService.login({
      username: username.trim(),
      password: password
    });

    this.SET_TOKEN(data.accessToken);
  }

  @Action
  public async getUserInfo() {
    if (this.token === '') {
      throw Error('token is undefined!');
    }

    const { data } = await userService.getUserInfo({});
    if (!data) {
      throw Error('Verification failed, please Login again.');
    }

    const { name, avatar, authority } = data.user;
    this.SET_AUTHORITY(authority);
    this.SET_NAME(name);
    this.SET_AVATAR(avatar);
  }

  @Action
  public resetToken() {
    removeToken();
    this.SET_TOKEN('');
    this.SET_AUTHORITY([]);
  }

  @Action
  public async loginOut() {
    if (this.token === '') {
      throw Error('token is undefined!');
    }
    await userService.loginOut();
    this.resetToken();
  }

  @Action
  public async ChangeRoles(authority: string) {
    const token = authority + '-token';
    this.SET_TOKEN(token);
    setToken(token);
    await this.getUserInfo();

    // Generate dynamic accessible routes based on roles

    // Add generated routes

    // Reset visited views and cached views
    TagsViewModule.delAllViews();
  }
}

export const UserModule = getModule(User);
