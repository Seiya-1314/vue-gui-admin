import Vue from 'vue';
import Vuex from 'vuex';

import { AppState } from './modules/app'

Vue.use(Vuex)

export interface RootState {
  app: AppState
  // user: IUserState
  // tagsView: ITagsViewState
  // errorLog: IErrorLogState
  // permission: IPermissionState
  // settings: ISettingsState
}

export default new Vuex.Store<RootState>({})