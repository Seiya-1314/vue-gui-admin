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
        min-width="120"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="currentType.userID"
        :label="currentType.userID"
        prop="userID"
        align="center"
        min-width="80"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.userID }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="currentType.origin"
        :label="currentType.origin"
        prop="origin"
        align="center"
        min-width="80"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.origin }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="currentType.phone"
        :label="currentType.phone"
        prop="phone"
        min-width="95px"
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
        min-width="90px"
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
        min-width="110px"
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
        min-width="80px"
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
        min-width="110px"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.replyTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="currentType.amount"
        :label="currentType.amount"
        prop="amount"
        min-width="60px"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.amount }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="currentType.status"
        :label="currentType.status"
        prop="status"
        class-name="status-col"
        width="100"
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
        v-if="currentType.mark"
        :label="currentType.mark"
        prop="mark"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.mark }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="!currentType.optionVisible"
        label="操作"
        align="center"
        min-width="130"
        class-name="fixed-width"
      >
        <template slot-scope="{row}">
          <el-button
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
    id: '用户ID',
    phone: '手机号',
    caseType: '问题类型',
    region: '地区',
    issueTime: '提交时间',
    respondent: '处理人',
    replyTime: '处理时间',
    status: '状态',
    statusOption: {
      danger: '未受理',
      success: '受理中',
      primary: '已完成'
    }
  },
  businessVip: {
    id: '用户ID',
    phone: '手机号',
    caseType: '类型',
    region: '地区',
    issueTime: '提交时间',
    respondent: '处理人',
    replyTime: '处理时间',
    status: '状态',
    statusOption: {
      danger: '未受理',
      success: '受理中',
      primary: '已完成'
    },
    mark: '备注'
  },
  businessQuick: {
    id: '用户ID',
    issue: '问题详情',
    issueTime: '提交时间',
    respondent: '处理人',
    replyTime: '处理时间',
    status: '状态',
    statusOption: {
      danger: '未回复',
      success: '咨询中',
      primary: '已完成',
      reply: '咨询中'
    }
  },
  businessPayList: {
    id: '订单号',
    userID: '用户ID',
    origin: '来源',
    region: '地区',
    caseType: '类型',
    issueTime: '提交时间',
    replyTime: '处理时间',
    amount: '支付金额',
    status: '状态',
    statusOption: {
      danger: '支付失败',
      success: '支付成功'
    },
    mark: '备注',
    optionVisible: true
  },
  businessEvaluate: {
    id: '订单号',
    userID: '用户ID',
    origin: '来源',
    caseType: '类型',
    replyTime: '评价时间',
    issue: '评价内容',
    status: '状态',
    statusOption: {
      danger: '屏蔽',
      success: '正常'
    },
    optionVisible: true
  },
  lawcase: {
    id: '订单号',
    userID: '律师ID',
    caseType: '类型',
    region: '涉案地区',
    phone: '手机号',
    issueTime: '提交时间',
    status: '状态',
    origin: '来源',
    statusOption: {
      danger: '未通知',
      success: '已通知'
    },
    optionVisible: true
  },
  lawyerList: {
    id: '姓名',
    userID: '律师ID',
    caseType: '专长',
    region: '所在地区',
    phone: '手机号',
    origin: '邮箱',
    issueTime: '注册时间',
    status: '认证状态',
    statusOption: {
      danger: '待认证',
      success: '认证成功'
    },
    optionVisible: true
  },
  point: {
    id: '姓名',
    userID: '律师ID',
    caseType: '类型',
    origin: '分数',
    issueTime: '时间',
    status: '审核',
    statusOption: {
      danger: '已审核',
      success: '未审核'
    },
    mark: '说明',
    optionVisible: true
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
