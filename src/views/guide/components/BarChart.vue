<template>
  <div
    class="chart"
    :style="{height: height, width: width}"
  />
</template>

<script lang="ts">
import echarts, { EChartOption } from 'echarts';
import { Component, Prop } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import ChartMixin from '@/mixins/chart/resize';

const animationDuration = 1500;

@Component({
  name: 'BarChart'
})
export default class extends mixins(ChartMixin) {
  @Prop({ default: '100%' }) private width!: string;
  @Prop({ default: '400px' }) private height!: string;

  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  }

  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  }

  private newNumber() {
    let result = [];
    for (let i = 0; i < 30; i++) {
      result.push(Math.floor(Math.random() * 1000) + 500);
    }
    return result;
  }

  private initChart() {
    this.chart = echarts.init(this.$el as HTMLDivElement, 'macarons');
    this.chart.setOption({
      title: {
        text: '最近三十天各项收益：(元)',
        textStyle: {
          fontSize: 16,
          lineHeight: 10,
          width: '100%'
        },
        textAlign: 'center',
        padding: 10,
        left: '50%'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: 10,
        left: '2%',
        right: '2%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: Object.keys(Array.apply(null, { length: 30 } as any)),
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisTick: {
            show: false
          }
        }
      ],
      series: [
        {
          name: '收费咨询',
          type: 'bar',
          stack: 'vistors',
          data: this.newNumber(),
          animationDuration
        },
        {
          name: '律师函',
          type: 'bar',
          stack: 'vistors',
          data: this.newNumber(),
          animationDuration
        },
        {
          name: '合同',
          type: 'bar',
          stack: 'vistors',
          data: this.newNumber(),
          animationDuration
        }
      ]
    } as EChartOption<EChartOption.SeriesBar>);
  }
}
</script>
