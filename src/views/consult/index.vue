<template>
  <div class="consult-wrapper">
    <ControlBar
      @export-consult="exportConsult"
      @search-consult="searchConsult"
    />
    <ConsultTable
      :loading="loading"
      :data="consultList"
      @reply-consult="replyConsult"
      @consult-detail="consultDetail"
      @browse-answer="browseAnswer"
    />
    <Pagination
      v-show="total > 0"
      :total="total"
      :page.sync="consultListQuery.page"
      :limit.sync="consultListQuery.limit"
      @pagination="getConsultList"
    />
    <ReplyDialog
      :data="currentConsult"
      :reply-dialog-visible.sync="replyDialogVisible"
      @submit="updateConsult"
    />
    <AnswerDialog
      :data="currentConsult"
      :answer-dialog-visible.sync="answerDialogVisible"
    />
    <DetailDialog
      :data="currentConsult"
      :detail-dialog-visible.sync="detailDialogVisible"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ControlBar from './components/ControlBar.vue';
import ConsultTable from './components/ConsultTable.vue';
import Pagination from '@/components/Pagination/index.vue';
import ReplyDialog from './components/ReplyDialog.vue';
import AnswerDialog from './components/AnswerDialog.vue';
import DetailDialog from './components/DetailDialog.vue';
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
    Pagination,
    ReplyDialog,
    AnswerDialog,
    DetailDialog
  }
})
export default class extends Vue {
  private consultList: ConsultTableConfig[];
  private loading: boolean;
  private consultListQuery: Object;
  private total: number;
  private currentConsult: ConsultTableConfig | string;
  private replyDialogVisible: boolean;
  private answerDialogVisible: boolean;
  private detailDialogVisible: boolean;

  constructor() {
    super();
    this.consultList = [];
    this.loading = false;
    this.total = 0;
    this.currentConsult = '';
    this.consultListQuery = {
      page: 1,
      limit: 20
    };
    this.replyDialogVisible = false;
    this.answerDialogVisible = false;
    this.detailDialogVisible = false;
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

  private replyConsult(row: any) {
    this.replyDialogVisible = true;
    this.currentConsult = row;
  }

  private consultDetail(row: any) {
    this.detailDialogVisible = true;
    this.currentConsult = row;
  }

  private browseAnswer(row: any) {
    this.answerDialogVisible = true;
    this.currentConsult = row;
  }

  private updateConsult(value: string) {
    this.$notify({
      title: '回复成功',
      message: '您已成功回复！',
      type: 'success',
      duration: 2000
    });
  }
}
</script>
