<template>
  <div class="control-bar">
    <el-input
      v-model="consultQuery.id"
      placeholder="咨询ID"
      style="width: 150px;"
      class="filter-item"
    />
    <el-input
      v-model="consultQuery.userID"
      placeholder="用户ID"
      style="width: 80px;"
      class="filter-item"
    />
    <el-input
      v-model="consultQuery.phone"
      placeholder="手机号"
      style="width: 120px;"
      class="filter-item"
    />
    <el-input
      v-model="consultQuery.region"
      placeholder="涉案地区"
      style="width: 120px;"
      class="filter-item"
    />
    <el-select
      v-model="consultQuery.caseType"
      placeholder="案件类型"
      clearable
      style="width: 120px"
      class="filter-item"
    >
      <el-option
        v-for="(item, index) in caseTypeOptions"
        :key="index"
        :label="item"
        :value="item"
      />
    </el-select>
    <el-select
      v-model="consultQuery.status"
      placeholder="回复状态"
      clearable
      class="filter-item"
      style="width: 130px"
    >
      <el-option
        v-for="item in statusType"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
    <el-button
      v-waves
      class="filter-item"
      type="primary"
      icon="el-icon-search"
      @click="searchConsultData"
    >搜索</el-button>
    <el-button
      v-waves
      :loading="loading"
      class="filter-item"
      type="primary"
      icon="el-icon-download"
      @click="exportConsultData"
    >导出</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import {
  searchConsult,
  ConsultQueryConfig,
  CaseTypeOption,
  StatusTypeOption
} from '@/api/consult';

@Component({
  name: 'ControlBar'
})
export default class extends Vue {
  private consultQuery: ConsultQueryConfig;
  private caseTypeOptions: any;
  private statusType: any;
  private loading: boolean;

  constructor() {
    super();
    this.consultQuery = {
      id: '',
      userID: '',
      phone: '',
      region: '',
      caseType: '',
      status: ''
    };
    this.caseTypeOptions = CaseTypeOption;
    this.statusType = StatusTypeOption;
    this.loading = false;
  }
  private searchConsultData() {
    this.$emit('search-consult', this.consultQuery);
  }

  private exportConsultData() {
    this.loading = true;
    this.$emit('export-consult');
    this.loading = false;
  }
}
</script>

<style lang="scss">
.control-bar {
  padding: 20px;
  .el-input {
    margin-right: 10px;
    .el-input__inner {
      height: 32px;
      font-size: 12px;
      line-height: 32px;
      vertical-align: middle;
    }
  }
  .el-select {
    margin-right: 10px;
  }
  .el-button {
    padding: 0;
    width: 90px;
    height: 32px;
    font-size: 12px;
    line-height: 32px;
  }
}
</style>
