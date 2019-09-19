<template>
  <el-dialog
    :visible="browseDialogVisible"
    :before-close="confirm"
  >
    <el-form
      label-position="left"
      label-width="80px"
      style="width: 580px; margin-left:50px;"
    >
      <el-form-item label="问题详情">{{ data.issue }}</el-form-item>
      <template v-if="!data.answer">
        <el-form-item label="处理人">{{ data.respondent }}</el-form-item>
        <el-form-item label="处理时间">{{ data.replyTime }}</el-form-item>
      </template>
      <el-form-item
        v-else
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

@Component({
  name: 'BrowseDialog'
})
export default class extends Vue {
  @Prop({ required: true })
  private browseDialogVisible!: boolean;

  @Prop()
  private data!: {};

  private confirm() {
    this.$emit('update:browseDialogVisible', false);
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
