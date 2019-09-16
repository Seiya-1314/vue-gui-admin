<template>
  <div class="forddiden-container">
    <el-row>
      <el-col :span="12">
        <el-button
          icon="el-icon-arrow-left"
          class="back-btn"
          @click="goBack"
        >返回</el-button>
        <h2 class="title">您没有权限访问该页面！</h2>
        <h6>请联系管理员~~~</h6>
        <ul class="list-unstyled">
          <li>或者您可以:</li>
          <li class="link-type">
            <router-link to="/guide">回首页</router-link>
          </li>
          <li class="link-type">
            <a href="https://github.com/Seiya-1314">随便看看</a>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img
          src="@/assets/403-images/403.gif"
          class="some-gif"
          width="313"
          height="428"
          alt="Girl has dropped her ice cream."
        />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Forddiden'
})
export default class extends Vue {
  private goBack() {
    if (this.$route.query.noGoBack) {
      this.$router.push({ path: '/dashboard' });
    } else {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss" scoped>
.forddiden-container {
  margin: 100px auto;
  width: 800px;
  max-width: 100%;
  .back-btn {
    display: block;
    background: #1482f0;
    color: #fff;
    border: none !important;
  }
  .title {
    font-size: 32px;
    font-weight: 700;
    line-height: 40px;
    color: #484848;
  }
  .some-gif {
    margin: 0 auto;
    display: block;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;
    }
    a {
      color: #1482f0;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
