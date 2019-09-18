<template>
  <div class="table-wrapper">
    <el-table
      v-loading="loading"
      :data="data"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      class="table-content"
    >
      <el-table-column
        :label="consultTableTitle.id"
        prop="id"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="consultTableTitle.phone"
        prop="phone"
        width="95px"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="consultTableTitle.caseType"
        prop="caseType"
        align="center"
        min-width="100px"
      >
        <template slot-scope="{row}">
          <el-tag>{{ row.caseType }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="consultTableTitle.region"
        prop="region"
        width="80px"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.region }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="consultTableTitle.respondent"
        prop="respondent"
        width="80px"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color:red;">{{ scope.row.respondent }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="consultTableTitle.replyTime"
        prop="replyTime"
        width="110px"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.replyTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="consultTableTitle.issue"
        prop="issue"
        width="210px"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span>{{ scope.row.issue }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="consultTableTitle.issueTime"
        prop="issueTime"
        width="110px"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.issueTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="consultTableTitle.status"
        prop="status"
        class-name="status-col"
        width="85"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.status === '已回复' ? 'success' : 'danger'">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="consultTableTitle.option"
        align="center"
        width="180"
        class-name="fixed-width"
      >
        <template slot-scope="{row}">
          <el-button
            type="primary"
            size="mini"
            @click="consultDetail(row)"
          >详情</el-button>
          <el-button
            v-if="row.status === '未回复'"
            size="mini"
            type="success"
            @click="replyConsult(row)"
          >回复</el-button>
          <el-button
            v-else
            size="mini"
            type="info"
            @click="browseAnswer(row)"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { ConsultTableConfig } from '@/api/consult';

@Component({
  name: 'ConsultTable'
})
export default class extends Vue {
  private consultTableTitle: ConsultTableConfig;

  constructor() {
    super();
    this.consultTableTitle = {
      id: '咨询ID',
      phone: '手机号',
      caseType: '案件类型',
      region: '地区',
      respondent: '回复人',
      replyTime: '回复时间',
      issue: '咨询问题',
      issueTime: '咨询时间',
      status: '是否回复',
      option: '操作'
    };
  }

  @Prop({ required: true })
  private data!: ConsultTableConfig[];

  @Prop()
  private loading!: boolean;

  private replyConsult(row: any) {
    this.$emit('reply-consult', row);
  }

  private consultDetail(row: any) {
    this.$emit('consult-detail', row);
  }

  private browseAnswer(row: any) {
    this.$emit('browse-answer', row);
  }
}
</script>

<style lang="scss">
.table-wrapper {
  padding: 20px;
  padding-top: 0;
}
.table-content {
  .el-table__header-wrapper {
    .el-table__header {
      .cell {
        font-size: 12px;
      }
    }
  }
  .el-table__body-wrapper {
    .el-table__body {
      .cell {
        font-size: 12px;
      }
    }
  }
}
</style>
