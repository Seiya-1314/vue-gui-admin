/**
 * @description 让 ts 识别 .vue
 *
 * 告诉 TypeScript *.vue 后缀的文件可以交给 vue 模块来处理
 */

declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
