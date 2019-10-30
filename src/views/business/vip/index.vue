<template>
  <div>
    <ControlBar
      type="businessVip"
      @search="searchBusinessVipList"
      @export="exportExcel"
    />
    <Table
      type="businessVip"
      :data="businessVipList"
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
      @pagination="getBusinessVipList"
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
  getBusinessVipList,
  searchBusinessVipList
} from '@/api/business_vip';

@Component({
  name: 'BusinessPhone',
  components: {
    ControlBar,
    Table,
    Pagination,
    DetailDialog,
    BrowseDialog
  }
})
export default class extends Vue {
  private businessVipList: [];
  private loading: boolean;
  private total: number;
  private currentData: { [key: string]: any };
  private businessListQuery: Object;
  private replyDialogVisible: boolean;
  private detailDialogVisible: boolean;
  private browseDialogVisible: boolean;

  constructor() {
    super();
    this.businessVipList = [];
    this.loading = false;
    this.total = 0;
    this.currentData = {};
    this.businessListQuery = {
      page: 1,
      limit: 20
    };
    this.replyDialogVisible = false;
    this.browseDialogVisible = false;
    this.detailDialogVisible = false;
  }

  created() {
    this.getBusinessVipList();
  }

  private async getBusinessVipList() {
    this.loading = true;
    const { data } = await getBusinessVipList(this.businessListQuery);
    this.businessVipList = data;
    this.total = data.length;
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  private async searchBusinessVipList(param: any) {
    this.loading = true;
    const { data } = await searchBusinessVipList(param);
    this.businessVipList = data;
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
    row.status = '受理中';
    this.$notify({
      title: '受理成功',
      message: '您已成功受理，请尽快处理！',
      type: 'success',
      duration: 2000
    });
    this.getBusinessVipList();
  }

  private exportExcel() {
    const tHeader = [
      '手机号',
      '问题类型',
      '地区',
      '提交时间',
      '处理人',
      '处理时间',
      '状态'
    ];
    const filterVal = [
      'phone',
      'caseType',
      'region',
      'issueTime',
      'respondent',
      'replyTime',
      'status'
    ];
    const data = formatJson(filterVal, this.getBusinessVipList);
    exportJson2Excel(tHeader, data, 'business-vip');
  }
}
</script>
