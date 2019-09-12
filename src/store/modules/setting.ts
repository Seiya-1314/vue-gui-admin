import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators';
import store from '@/store';

export interface SettingsState {
  fixedHeader: boolean;
  settingsVisiable: boolean;
  tagsViewVisiable: boolean;
  logoVisiable: boolean;
}

@Module({ dynamic: true, store, name: 'settings' })
class Settings extends VuexModule implements SettingsState {
  public fixedHeader = false;
  public settingsVisiable = true;
  public tagsViewVisiable = false;
  public logoVisiable = false;

  @Mutation
  private CHANGE_SETTING(payload: { key: string; value: any }) {
    const { key, value } = payload;
    if (Object.prototype.hasOwnProperty.call(this, key)) {
      (this as any)[key] = value;
    }
  }

  @Action
  public ChangeSetting(payload: { key: string; value: any }) {
    this.CHANGE_SETTING(payload);
  }
}

export const SettingsModule = getModule(Settings);