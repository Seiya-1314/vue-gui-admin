<template>
  <div>
    <ControlBar
      type="businessQuick"
      @search="searchBusinessQuickList"
      @export="exportExcel"
    />
    <Table
      type="businessQuick"
      :data="businessQuickList"
      :loading="loading"
      @detail="detail"
      @browse="browse"
      @accept="accept"
      @reply="reply"
    />
    <Pagination
      v-show="total > 0"
      :total="total"
      :page.sync="businessListQuery.page"
      :limit.sync="businessListQuery.limit"
      @pagination="getBusinessQuickList"
    />
    <DetailDialog
      :data="currentData"
      :detail-dialog-visible.sync="detailDialogVisible"
    />
    <BrowseDialog
      :data="currentData"
      :browse-dialog-visible.sync="browseDialogVisible"
    />
    <ReplyDialog
      :data="currentData"
      :reply-dialog-visible.sync="replyDialogVisible"
      @submit="update"
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
import ReplyDialog from '@/components/ReplyDialog/index.vue';
import { exportJson2Excel } from '@/utils/excel';
import { formatJson } from '@/utils';
import {
  getBusinessQuickList,
  searchBusinessQuickList
} from '@/api/business_quick';

@Component({
  name: 'BusinessQuick',
  components: {
    ControlBar,
    Table,
    Pagination,
    DetailDialog,
    BrowseDialog,
    ReplyDialog
  }
})
export default class extends Vue {
  private businessQuickList: [];
  private loading: boolean;
  private total: number;
  private currentData: { [key: string]: any };
  private businessListQuery: Object;
  private replyDialogVisible: boolean;
  private detailDialogVisible: boolean;
  private browseDialogVisible: boolean;

  constructor() {
    super();
    this.businessQuickList = [];
    this.loading = false;
    this.total = 0;
    this.currentData = {};
    this.businessListQuery = {
      page: 1,
      limit: 20
    };

    this.browseDialogVisible = false;
    this.detailDialogVisible = false;
    this.replyDialogVisible = false;
  }

  created() {
    this.getBusinessQuickList();
  }

  private async getBusinessQuickList() {
    this.loading = true;
    const { data } = await getBusinessQuickList(this.businessListQuery);
    this.businessQuickList = data;
    this.total = data.length;
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  private async searchBusinessQuickList(param: any) {
    this.loading = true;
    const { data } = await searchBusinessQuickList(param);
    this.businessQuickList = data;
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
    this.getBusinessQuickList();
  }

  private reply(row: any) {
    this.replyDialogVisible = true;
    this.currentData = row;
  }

  private update(val: string) {
    this.$notify({
      title: '回复成功',
      message: '您已成功回复！',
      type: 'success',
      duration: 2000
    });
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
    const data = formatJson(filterVal, this.getBusinessQuickList);
    exportJson2Excel(tHeader, data, 'business-Quick');
  }
}
</script>
