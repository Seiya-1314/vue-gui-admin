<template>
  <div>
    <ControlBar
      type="businessText"
      @search="searchBusinessTextList"
      @export="exportExcel"
    />
    <Table
      type="businessText"
      :data="businessTextList"
      :loading="loading"
      @detail="detail"
      @browse="browse"
      @accept="accept"
    />
    <Pagination
      v-show="total > 0"
      :total="total"
      :page.sync="businessListQuery.page"
      :limit.sync="businessListQuery.limit"
      @pagination="getBusinessTextList"
    />
    <DetailDialog
      :data="currentData"
      :detail-dialog-visible.sync="detailDialogVisible"
    />
    <BrowseDialog
      :data="currentData"
      :browse-dialog-visible.sync="browseDialogVisible"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ControlBar from '@/components/ControlBar/index.vue';
import Table from '@/components/Table/index.vue';
import Pagination from '@/components/Pagination/index.vue';
import DetailDialog from '@/components/DetailDialog/index.vue';
import BrowseDialog from '@/components/BrowseDialog/index.vue';
import { exportJson2Excel } from '@/utils/excel';
import { formatJson } from '@/utils';
import {
  getBusinessTextList,
  searchBusinessTextList
} from '@/api/business_text';

@Component({
  name: 'BusinessText',
  components: {
    ControlBar,
    Table,
    Pagination,
    DetailDialog,
    BrowseDialog
  }
})
export default class extends Vue {
  private businessTextList: [];
  private loading: boolean;
  private total: number;
  private currentData: { [key: string]: any };
  private businessListQuery: Object;
  private detailDialogVisible: boolean;
  private browseDialogVisible: boolean;

  constructor() {
    super();
    this.businessTextList = [];
    this.loading = false;
    this.total = 0;
    this.currentData = {};
    this.businessListQuery = {
      page: 1,
      limit: 20
    };
    this.browseDialogVisible = false;
    this.detailDialogVisible = false;
  }

  created() {
    this.getBusinessTextList();
  }

  private async getBusinessTextList() {
    this.loading = true;
    const { data } = await getBusinessTextList(this.businessListQuery);
    this.businessTextList = data;
    this.total = data.length;
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  private async searchBusinessTextList(param: any) {
    this.loading = true;
    const { data } = await searchBusinessTextList(param);
    this.businessTextList = data;
    this.total = data.length;
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  private detail(row: any) {
    this.detailDialogVisible = true;
    this.currentData = row;
  }

  private browse(row: any) {
    this.browseDialogVisible = true;
    this.currentData = row;
  }

  private accept(row: any) {
    row.status = '受理中'
    this.$notify({
      title: '受理成功',
      message: '您已成功受理，请尽快处理！',
      type: 'success',
      duration: 2000
    });
    this.getBusinessTextList();
  }

  private exportExcel() {
    const tHeader = [
      '手机号',
      '问题类型',
      '地区',
      '咨询问题',
      '咨询时间',
      '回复人',
      '回复时间',
      '状态'
    ];
    const filterVal = [
      'phone',
      'caseType',
      'region',
      'issue',
      'issueTime',
      'respondent',
      'replyTime',
      'status'
    ];
    const data = formatJson(filterVal, this.businessTextList);
    exportJson2Excel(tHeader, data, 'business-text');
  }
}
</script>
