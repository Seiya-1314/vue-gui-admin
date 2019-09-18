<template>
  <div class="consult-wrapper">
    <ControlBar
      @export-consult="exportConsult"
      @search-consult="searchConsult"
    />
    <ConsultTable
      :loading="loading"
      :data="consultList"
    />
    <Pagination
      v-show="total > 0"
      :total="total"
      :page.sync="consultListQuery.page"
      :limit.sync="consultListQuery.limit"
      @pagination="getConsultList"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ControlBar from './components/ControlBar.vue';
import ConsultTable from './components/ConsultTable.vue';
import Pagination from '@/components/Pagination/index.vue';
import { exportJson2Excel } from '@/utils/excel';
import { formatJson } from '@/utils';
import {
  getConsultList,
  searchConsult,
  ConsultTableConfig,
  ConsultQueryConfig
} from '@/api/consult';

@Component({
  name: 'Consult',
  components: {
    ControlBar,
    ConsultTable,
    Pagination
  }
})
export default class extends Vue {
  private consultList: ConsultTableConfig[];
  private loading: boolean;
  private consultListQuery: Object;
  private total: number;

  constructor() {
    super();
    this.consultList = [];
    this.loading = false;
    this.total = 0;
    this.consultListQuery = {
      page: 1,
      limit: 20
    };
  }

  async created() {
    this.getConsultList();
  }

  private async getConsultList() {
    this.loading = true;
    const { data } = await getConsultList(this.consultListQuery);
    this.consultList = data;
    this.total = data.length;
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  private async searchConsult(param: ConsultQueryConfig) {
    this.loading = true;
    const { data } = await searchConsult(param);
    this.consultList = data;
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  private exportConsult() {
    const tHeader = [
      '咨询id',
      '手机号',
      '案件类型',
      '地区',
      '回复人',
      '回复时间',
      '咨询问题',
      '咨询时间',
      '是否回复'
    ];
    const filterVal = [
      'id',
      'phone',
      'caseType',
      'region',
      'respondent',
      'replyTime',
      'issue',
      'issueTime',
      'status'
    ];
    const data = formatJson(filterVal, this.consultList);
    exportJson2Excel(tHeader, data, 'consult-list');
  }
}
</script>
