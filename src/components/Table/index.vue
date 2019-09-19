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
        v-if="currentType.id"
        :label="currentType.id"
        prop="id"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="currentType.phone"
        :label="currentType.phone"
        prop="phone"
        width="95px"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="currentType.caseType"
        :label="currentType.caseType"
        prop="caseType"
        align="center"
        width="100px"
      >
        <template slot-scope="{row}">
          <el-tag>{{ row.caseType }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        v-if="currentType.region"
        :label="currentType.region"
        prop="region"
        width="80px"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.region }}</span>
        </template>
      </el-table-column>

      <el-table-column
        v-if="currentType.issue"
        :label="currentType.issue"
        prop="issue"
        min-width="200px"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span>{{ scope.row.issue }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="currentType.issueTime"
        :label="currentType.issueTime"
        prop="issueTime"
        width="110px"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.issueTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="currentType.respondent"
        :label="currentType.respondent"
        prop="respondent"
        width="80px"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color:red;">{{ scope.row.respondent }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="currentType.replyTime"
        :label="currentType.replyTime"
        prop="replyTime"
        width="110px"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.replyTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="currentType.status"
        :label="currentType.status"
        prop="status"
        class-name="status-col"
        width="85"
      >
        <template slot-scope="{row}">
          <el-tag
            v-if="row.status === currentType.statusOption.danger"
            type="danger"
          >{{ row.status }}</el-tag>
          <el-tag
            v-else-if="row.status === currentType.statusOption.primary"
            type="primary"
          >{{ row.status }}</el-tag>
          <el-tag
            v-else
            type="success"
          >{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="180"
        class-name="fixed-width"
      >
        <template slot-scope="{row}">
          <el-button
            type="primary"
            size="mini"
            @click="detail(row)"
          >详情</el-button>
          <el-button
            v-if="row.status === currentType.statusOption.danger"
            size="mini"
            type="primary"
            @click="accept(row)"
          >受理</el-button>
          <el-button
            v-if="currentType.statusOption.reply && row.status === currentType.statusOption.reply"
            size="mini"
            type="success"
            @click="reply(row)"
          >回复</el-button>
          <el-button
            v-if="row.status === currentType.statusOption.primary"
            size="mini"
            type="info"
            @click="browse(row)"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

const tableType: { [key: string]: any } = {
  businessText: {
    phone: '手机号',
    caseType: '问题类型',
    region: '地区',
    issue: '咨询问题',
    issueTime: '咨询时间',
    respondent: '回复人',
    replyTime: '回复时间',
    status: '状态',
    statusOption: {
      danger: '未受理',
      success: '受理中',
      primary: '已完成'
    }
  },
  businessPhone: {
    userID: '用户ID',
    phone: '手机号',
    region: '涉案地区',
    status: '状态',
    statusType: ['未受理', '受理中', '已完成']
  }
};

@Component({
  name: 'Table'
})
export default class extends Vue {
  get currentType() {
    return tableType[this.type];
  }

  @Prop({ required: true })
  private type!: string;

  @Prop({ required: true })
  private data!: [];

  @Prop()
  private loading!: boolean;

  private detail(row: any) {
    this.$emit('detail', row);
  }

  private accept(row: any) {
    this.$emit('accept', row);
  }

  private reply(row: any) {
    this.$emit('reply', row);
  }

  private browse(row: any) {
    this.$emit('browse', row);
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
