<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">系统登录</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="账号"
          name="username"
          type="text"
          autocomplete="on"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          autocomplete="on"
          @keyup.enter.native="handleLogin"
        />
        <span
          class="show-pwd"
          @click="changePasswordType"
        >
          <svg-icon :icon-class="passwordType === 'password' ? 'eye-off' : 'eye-on'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%; margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Form as ElForm, Input } from 'element-ui';

import { isValidUsername } from '@/utils/validate';

interface LoginForm {
  username: string;
  password: string;
}

interface LoginRule {
  username: any;
  password: any;
}

@Component({
  name: 'Login'
})
export default class extends Vue {
  private loginForm: LoginForm;
  private loginRules: LoginRule;
  private passwordType: string;
  private loading: boolean;
  private showDialog: boolean;

  constructor() {
    super();
    this.passwordType = 'password';
    this.loading = false;
    this.showDialog = false;
    this.loginForm = {
      username: 'admin',
      password: '111111'
    };
    this.loginRules = {
      username: [
        {
          validator: this.validateUsername,
          trigger: 'blur'
        }
      ],
      password: [
        {
          validator: this.validatePassword,
          trigger: 'blur'
        }
      ]
    };
  }

  mounted() {
    if (this.loginForm.username === '') {
      (this.$refs.username as Input).focus()
    } else if (this.loginForm.password === '') {
      (this.$refs.password as Input).focus()
    }
  }

  private validateUsername = (rule: any, value: string, callback: Function) => {
    if (value === '') {
      callback(new Error('请输入用户名！'));
    } else if (!isValidUsername(value)) {
      callback(new Error('您输入的用户名不存在！'));
    } else {
      callback();
    }
  };

  private validatePassword = (rule: any, value: string, callback: Function) => {
    if (value === '') {
      callback(new Error('请输入密码！！'));
    } else if (value.length < 6) {
      callback(new Error('密码不能小于 6 个字符！'));
    } else {
      callback();
    }
  };

  private changePasswordType(): void {
    if (this.passwordType === 'password') {
      this.passwordType = '';
    } else {
      this.passwordType = 'password';
    }
    this.$nextTick(() => {
      (this.$refs.password as Input).focus();
    });
  }

  private handleLogin(): void {
    (this.$refs.loginForm as ElForm).validate((valid: boolean) => {
      if (valid) {
        this.loading = true;

        // TODO: 执行登录操作

        /* 路由跳转 */
        this.$router.push('/')

        setTimeout(() => {
          this.loading = false;
        }, 500);
      } else {
        console.error('校验失败，请重新输入！');
      }
    })
  }
}
</script>

<style lang="scss">
@supports (-webkit-mask: none) and (not (cater-color: $loginCursorColor)) {
  .login-container .el-input {
    input {
      color: $loginCursorColor;
    }
    input::first-line {
      color: $lightGray;
    }
  }
}
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      height: 47px;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $lightGray;
      caret-color: $loginCursorColor;
      -webkit-appearance: none;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    margin-bottom: 28px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    .el-form-item__error {
      padding-top: 8px;
    }
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: $loginBg;
  .login-form {
    position: relative;
    margin: 0 auto;
    padding: 160px 35px 0;
    width: 520px;
    max-width: 100%;
    overflow: hidden;
    .el-button {
      margin-top: 8px;
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $lightGray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
