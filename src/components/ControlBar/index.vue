<template>
  <div class="control-bar">
    <el-input
      v-if="currentType.id"
      v-model="query.id"
      :placeholder="currentType.id"
      style="width: 150px;"
      class="filter-item"
    />
    <el-input
      v-if="currentType.userID"
      v-model="query.userID"
      :placeholder="currentType.userID"
      style="width: 80px;"
      class="filter-item"
    />
    <el-input
      v-if="currentType.phone"
      v-model="query.phone"
      :placeholder="currentType.phone"
      style="width: 120px;"
      class="filter-item"
    />
    <el-input
      v-if="currentType.region"
      v-model="query.region"
      :placeholder="currentType.region"
      style="width: 120px;"
      class="filter-item"
    />
    <el-input
      v-if="currentType.lawyer"
      v-model="query.lawyer"
      :placeholder="currentType.lawyer"
      style="width: 120px;"
      class="filter-item"
    />
    <el-select
      v-if="currentType.caseType"
      v-model="query.caseType"
      :placeholder="currentType.caseType"
      clearable
      style="width: 120px"
      class="filter-item"
    >
      <el-option
        v-for="(item, index) in currentType.caseTypeOptions"
        :key="index"
        :label="item"
        :value="item"
      />
    </el-select>
    <el-select
      v-if="currentType.status"
      v-model="query.status"
      placeholder="状态"
      clearable
      class="filter-item"
      style="width: 130px"
    >
      <el-option
        v-for="item in currentType.statusType"
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
      @click="search"
    >搜索</el-button>
    <el-button
      v-if="!currentType.exportVisable"
      v-waves
      class="filter-item"
      type="primary"
      icon="el-icon-download"
      @click="exportExcel"
    >导出</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

const controlBarType: { [key: string]: any } = {
  businessText: {
    userID: '用户ID',
    phone: '手机号',
    region: '涉案地区',
    caseType: '问题类型',
    caseTypeOptions: [
      '房地产',
      '婚姻家庭',
      '投资理财',
      '债权债务',
      '交通事故',
      '商业合同'
    ],
    status: '状态',
    statusType: ['未受理', '受理中', '已完成']
  },
  businessPhone: {
    userID: '用户ID',
    phone: '手机号',
    lawyer: '律师',
    region: '涉案地区',
    caseType: '问题类型',
    caseTypeOptions: [
      '房地产',
      '婚姻家庭',
      '投资理财',
      '债权债务',
      '交通事故',
      '商业合同'
    ],
    status: '状态',
    statusType: ['未受理', '受理中', '已完成']
  },
  businessVip: {
    userID: '用户ID',
    phone: '手机号',
    caseType: '类型',
    caseTypeOptions: [
      '代写文书',
      '合同审查',
      '律师函',
      '自助打官司'
    ],
    status: '状态',
    statusType: ['未受理', '受理中', '已完成']
  },
  businessQuick: {
    userID: '用户ID',
    status: '状态',
    statusType: ['未回复', '咨询中', '已完成']
  },
  businessPayList: {
    id: '订单号',
    userID: '用户ID',
    caseType: '类型',
    caseTypeOptions: [
      '文字咨询',
      '电话咨询',
      '代写文书',
      '合同审查',
      '律师函',
      '自助打官司'
    ],
    status: '状态',
    statusType: ['支付成功', '支付失败'],
    exportVisable: true
  },
  businessEvaluate: {
    id: '订单号',
    userID: '用户ID',
    caseType: '类型',
    caseTypeOptions: [
      '文字咨询',
      '电话咨询',
      '代写文书',
      '合同审查',
      '律师函',
      '自助打官司'
    ],
    status: '状态',
    statusType: ['正常', '屏蔽'],
    exportVisable: true
  },
  lawcase: {
    id: '订单号',
    userID: '律师ID',
    caseType: '类型',
    caseTypeOptions: [
      '文字咨询',
      '电话咨询',
      '代写文书',
      '合同审查',
      '律师函',
      '自助打官司'
    ],
    status: '状态',
    statusType: ['已通知', '未通知'],
    exportVisable: true
  },
  lawyerList: {
    userID: '律师ID',
    caseType: '选择专长',
    caseTypeOptions: [
      '文字咨询',
      '电话咨询',
      '代写文书',
      '合同审查',
      '律师函',
      '自助打官司'
    ],
    status: '认证状态',
    statusType: ['待认证', '审核中', '认证成功'],
    exportVisable: true
  },
  point: {
    userID: '关键词',
    caseType: '类型',
    caseTypeOptions: [
      '服务',
      '推广',
      '案件',
      '其他',
      '全部'
    ],
    exportVisable: true
  }
};

@Component({
  name: 'ControlBar'
})
export default class extends Vue {
  private query: { [key: string]: any };

  constructor() {
    super();
    this.query = {
      id: '',
      userID: '',
      phone: '',
      region: '',
      caseType: '',
      status: ''
    };
  }

  @Prop()
  private type!: string;

  get currentType() {
    return controlBarType[this.type];
  }

  private search() {
    this.$emit('search', this.query);
  }

  private exportExcel() {
    this.$emit('export');
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
