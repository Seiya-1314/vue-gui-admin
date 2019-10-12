<template>
  <el-dialog
    :title="title"
    :visible="replyDialogVisible"
    :before-close="cancel"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      label-position="left"
      label-width="80px"
      style="width: 580px; margin-left:50px;"
    >
      <el-form-item label="问题详情">{{ data.issue }}</el-form-item>
      <el-form-item
        label="回答"
        prop="answer"
      >
        <el-input
          v-model="ruleForm.answer"
          :autosize="{minRows: 4, maxRows: 10}"
          type="textarea"
          placeholder="请输入..."
        />
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel">取消</el-button>
      <el-button
        type="primary"
        @click="submitAnswer"
      >提交</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'ReplyDialog'
})
export default class extends Vue {
  private title: string;
  private ruleForm: { answer: string };
  private rules: any;

  constructor() {
    super();
    this.title = '回复';
    this.ruleForm = {
      answer: ''
    };
    this.rules = {
      answer: [
        {
          validator: this.validateInput,
          trigger: 'blur'
        }
      ]
    };
  }

  @Prop({ required: true })
  private replyDialogVisible!: boolean;

  @Prop()
  private data!: [];

  private validateInput = (rule: any, value: string, callback: Function) => {
    if (value === '') {
      callback(new Error('回复内容不能为空！'));
    } else if (value.length < 10) {
      callback(new Error('回复内容不能小于 10 个字符！'));
    } else {
      callback();
    }
  };

  private cancel() {
    this.ruleForm.answer = '';
    this.$emit('update:replyDialogVisible', false);
  }

  private submitAnswer() {
    if (!this.ruleForm.answer || this.ruleForm.answer.length < 10) return;
    this.cancel();
    this.$emit('submit', this.ruleForm.answer);
  }
}
</script>

<style lang="scss">
.el-dialog {
  .el-dialog__body {
    .el-form-item__content {
      line-height: 28px;
    }
  }
}
</style>
