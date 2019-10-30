<template>
  <div>
    <ControlBar
      type="businessEvaluate"
      @search="searchBusinessEvaluate"
    />
    <Table
      type="businessEvaluate"
      :data="businessEvaluate"
      :loading="loading"
    />
    <Pagination
      v-show="total > 0"
      :total="total"
      :page.sync="businessListQuery.page"
      :limit.sync="businessListQuery.limit"
      @pagination="getBusinessEvaluate"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ControlBar from '@/components/ControlBar/index.vue';
import Table from '@/components/Table/index.vue';
import Pagination from '@/components/Pagination/index.vue';
import {
  getBusinessEvaluate,
  searchBusinessEvaluate
} from '@/api/business_evaluate';

@Component({
  name: 'BusinessEvaluate',
  components: {
    ControlBar,
    Table,
    Pagination
  }
})
export default class extends Vue {
  private businessEvaluate: [];
  private loading: boolean;
  private total: number;
  private businessListQuery: Object;

  constructor() {
    super();
    this.businessEvaluate = [];
    this.loading = false;
    this.total = 0;
    this.businessListQuery = {
      page: 1,
      limit: 20
    };
  }

  created() {
    this.getBusinessEvaluate();
  }

  private async getBusinessEvaluate() {
    this.loading = true;
    const { data } = await getBusinessEvaluate(this.businessListQuery);
    this.businessEvaluate = data;
    this.total = data.length;
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  private async searchBusinessEvaluate(param: any) {
    this.loading = true;
    const { data } = await searchBusinessEvaluate(param);
    this.businessEvaluate = data;
    this.total = data.length;
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
}
</script>
