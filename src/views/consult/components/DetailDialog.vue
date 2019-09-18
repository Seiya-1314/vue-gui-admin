<template>
  <el-dialog
    :visible="detailDialogVisible"
    :before-close="confirm"
  >
    <el-form
      label-position="left"
      label-width="80px"
      style="width: 580px; margin-left:50px;"
    >
      <el-form-item label="咨询ID">{{ data.id }}</el-form-item>
      <el-form-item label="联系电话">{{ data.phone }}</el-form-item>
      <el-form-item label="案件类型">{{ data.caseType }}</el-form-item>
      <el-form-item label="涉案地区">{{ data.region }}</el-form-item>
      <el-form-item label="案件详情">{{ data.issue }}</el-form-item>
      <el-form-item
        v-if="data.answer"
        :label="data.respondent"
      >{{ data.answer }}</el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="primary"
        @click="confirm"
      >确定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { ConsultTableConfig } from '@/api/consult';

@Component({
  name: 'DetailDialog'
})
export default class extends Vue {
  @Prop({ required: true })
  private detailDialogVisible!: boolean;

  @Prop()
  private data!: ConsultTableConfig;

  private confirm() {
    this.$emit('update:detailDialogVisible', false);
  }
}
</script>

<style lang="scss">
.el-dialog {
  .el-dialog__body {
    .el-form-item__content {
      line-height: 28px;
    }
    .el-form-item__label {
      line-height: 28px;
    }
  }
}
</style>
