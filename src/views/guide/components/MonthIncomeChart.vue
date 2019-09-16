<template>
  <div
    class="chart"
    :style="{height: height, width: width}"
  />
</template>

<script lang="ts">
import echarts, { EChartOption } from 'echarts';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

import ChartMixin from '@/mixins/chart/resize';

export interface LineChartData {
  title: string;
  expectedData: number[];
  actualData?: number[];
}

@Component({
  name: 'LineChart'
})
export default class extends mixins(ChartMixin) {
  @Prop({ required: true })
  private chartData!: LineChartData;

  @Prop({ default: '100%' })
  private width!: string;

  @Prop({ default: '350px' })
  private height!: string;

  @Watch('chartData', { deep: true })
  private onChartDataChange(value: LineChartData) {
    this.setOptions(value);
  }

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

  private initChart() {
    this.chart = echarts.init(this.$el as HTMLDivElement, 'macarons');
    this.setOptions(this.chartData);
  }

  private setOptions(chartData: LineChartData) {
    if (this.chart) {
      this.chart.setOption({
        title: {
          text: chartData.title,
          textStyle: {
            fontSize: 16,
            lineHeight: 10,
            width: '100%'
          },
          textAlign: 'center',
          padding: 10,
          left: '50%'
        },
        xAxis: {
          data: Object.keys(Array.apply(null, { length: 30 } as any)),
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: 8
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          show: this.chartData.actualData,
          data: ['expected', 'actual']
        },
        series: [
          {
            name: '收入',
            itemStyle: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            },
            smooth: true,
            type: 'line',
            data: chartData.expectedData,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            name: 'actual',
            smooth: true,
            type: 'line',
            itemStyle: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              }
            },
            data: chartData.actualData,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }
        ]
      } as EChartOption<EChartOption.SeriesLine>);
    }
  }
}
</script>
