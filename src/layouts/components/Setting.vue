<template>
  <div class="setting-container">
    <div>
      <h3 class="setting-title">
        系统布局配置
      </h3>
      <div class="setting-item">
        <span>显示 Tags-View</span>
        <el-switch
          v-model="tagsViewVisiable"
          class="setting-switch"
        />
      </div>
      <div class="setting-item">
        <span>显示 Logo</span>
        <el-switch
          v-model="logoVisiable"
          class="setting-switch"
        />
      </div>
      <div class="setting-item">
        <span>固定 Header</span>
        <el-switch
          v-model="fixedHeader"
          class="setting-switch"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SettingsModule } from '@/store/modules/setting';

@Component({
  name: 'Setting'
})
export default class extends Vue {
  get fixedHeader() {
    return SettingsModule.fixedHeader;
  }

  get tagsViewVisiable() {
    return SettingsModule.tagsViewVisiable;
  }

  get logoVisiable() {
    return SettingsModule.logoVisiable;
  }

  set fixedHeader(value) {
    SettingsModule.ChangeSetting({ key: 'fixedHeader', value })
  }

  set tagsViewVisiable(value) {
    SettingsModule.ChangeSetting({ key: 'tagsViewVisiable', value })
  }

  set logoVisiable(value) {
    SettingsModule.ChangeSetting({ key: 'logoVisiable', value })
  }
}
</script>

<style lang="scss" scoped>
.setting-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  .setting-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }
  .setting-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }
  .setting-switch {
    float: right;
  }
}
</style>
