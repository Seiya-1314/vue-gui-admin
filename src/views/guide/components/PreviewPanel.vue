<template>
  <el-row
    :gutter="40"
    class="panel-group"
  >
    <el-col
      class="panel-item"
      :xs="12"
      :sm="12"
      :lg="6"
    >
      <div class="panel-content">
        <div class="panel-icon-wrapper icon-people">
          <svg-icon
            class="panel-icon"
            icon-class="peoples"
          />
        </div>
        <div class="panel-description">
          <div class="panel-title">新增用户</div>
          <count-to
            :start-val="0"
            :end-val="102"
            :duration="1500"
            class="panel-number"
          />
        </div>
      </div>
    </el-col>
    <el-col
      class="panel-item"
      :xs="12"
      :sm="12"
      :lg="6"
    >
      <div class="panel-content">
        <div class="panel-icon-wrapper icon-lawyer">
          <svg-icon
            class="panel-icon"
            icon-class="lawyer"
          />
        </div>
        <div class="panel-description">
          <div class="panel-title">新增律师</div>
          <count-to
            :start-val="0"
            :end-val="46"
            :duration="1500"
            class="panel-number"
          />
        </div>
      </div>
    </el-col>
    <el-col
      class="panel-item"
      :xs="12"
      :sm="12"
      :lg="6"
    >
      <div class="panel-content">
        <div class="panel-icon-wrapper icon-message">
          <svg-icon
            class="panel-icon"
            icon-class="message"
          />
        </div>
        <div class="panel-description">
          <div class="panel-title">新增咨询</div>
          <count-to
            :start-val="0"
            :end-val="362"
            :duration="1500"
            class="panel-number"
          />
        </div>
      </div>
    </el-col>
    <el-col
      class="panel-item"
      :xs="12"
      :sm="12"
      :lg="6"
    >
      <div class="panel-content">
        <div class="panel-icon-wrapper icon-money">
          <svg-icon
            class="panel-icon"
            icon-class="money"
          />
        </div>
        <div class="panel-description">
          <div class="panel-title">今日收入</div>
          <count-to
            :start-val="0"
            :end-val="2999"
            :duration="1500"
            class="panel-number"
          />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CountTo from 'vue-count-to';

@Component({
  name: 'PreviewPanel',
  components: {
    CountTo
  }
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 10px;
  .panel-item {
    margin-bottom: 32px;
    .panel-content {
      position: relative;
      height: 108px;
      color: #666;
      font-size: 12px;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      border-color: rgba(0, 0, 0, 0.05);
      overflow: hidden;
      cursor: pointer;
      &:hover {
        .panel-icon-wrapper {
          color: #fff;
        }
        .icon-people {
          background: #40c9c6;
        }
        .icon-message {
          background: #34bfa3;
        }
        .icon-money {
          background: #f4516c;
        }
        .icon-lawyer {
          background: #36a3f7;
        }
      }
      .icon-people {
        color: #40c9c6;
      }
      .icon-message {
        color: #34bfa3;
      }
      .icon-money {
        color: #f4516c;
      }
      .icon-lawyer {
        color: #36a3f7;
      }
    }
    .panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
      .panel-icon {
        float: left;
        font-size: 48px;
      }
    }
    .panel-description {
      float: right;
      font-weight: bold;
      margin: 26px 32px 26px 0;
      .panel-title {
        margin-bottom: 12px;
        font-size: 18px;
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
      }
      .panel-number {
        font-size: 24px;
      }
    }
  }
}
@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }
  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;
    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
