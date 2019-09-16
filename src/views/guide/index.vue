<template>
  <div class="report-wrapper">
    <PreviewPanel />

    <el-row style="background:#fff;padding:32px 16px 0;margin:32px 0 32px;">
      <LineChart :chart-data="lineChartData" />
    </el-row>

    <el-row style="background:#fff;padding:32px 16px 0;margin-bottom:32px;">
      <MonthIncomeChart :chart-data="MonthIncomeData" />
    </el-row>

    <el-row style="background:#fff;padding:48px 16px 0;margin-bottom:32px;">
      <BarChart />
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import PreviewPanel from './components/PreviewPanel.vue';
import LineChart from '@/components/LineChart/index.vue';
import MonthIncomeChart from './components/MonthIncomeChart.vue';
import BarChart from './components/BarChart.vue';

@Component({
  name: 'Guide',
  components: {
    PreviewPanel,
    LineChart,
    MonthIncomeChart,
    BarChart
  }
})
export default class extends Vue {
  get lineChartData() {
    return {
      title: '最近一周净收益：(元)',
      expectedData: [2999, 5340, 3580, 4436, 5579, 2648, 3780]
      // actualData: [120, 82, 91, 154, 162, 140, 145]
    };
  }

  get MonthIncomeData() {
    return {
      title: '最近三十天净收益：(元)',
      expectedData: [2999, 5340, 3580, 4436, 5579, 2648, 3780, 5579, 2648, 3780, 2648, 3780, 5579, 2648, 3780, 2999, 5340, 3580, 4436, 5579, 2648, 3780, 5579, 2648, 3780, 2648, 3780, 5579, 2648, 3780]
      // actualData: [120, 82, 91, 154, 162, 140, 145]
    };
  }
}
</script>

<style lang="scss" scoped>
.report-wrapper {
  position: relative;
  padding: 32px;
  background-color: rgb(240, 242, 245);
}
</style>
