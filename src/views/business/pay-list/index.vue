<template>
  <div>
    <ControlBar
      type="businessPayList"
      @search="searchBusinessPayList"
    />
    <Table
      type="businessPayList"
      :data="businessPayList"
      :loading="loading"
    />
    <Pagination
      v-show="total > 0"
      :total="total"
      :page.sync="businessListQuery.page"
      :limit.sync="businessListQuery.limit"
      @pagination="getBusinessPayList"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ControlBar from '@/components/ControlBar/index.vue';
import Table from '@/components/Table/index.vue';
import Pagination from '@/components/Pagination/index.vue';
import {
  getBusinessPayList,
  searchBusinessPayList
} from '@/api/business_paylist';

@Component({
  name: 'BusinessPayList',
  components: {
    ControlBar,
    Table,
    Pagination
  }
})
export default class extends Vue {
  private businessPayList: [];
  private loading: boolean;
  private total: number;
  private businessListQuery: Object;

  constructor() {
    super();
    this.businessPayList = [];
    this.loading = false;
    this.total = 0;
    this.businessListQuery = {
      page: 1,
      limit: 20
    };
  }

  created() {
    this.getBusinessPayList();
  }

  private async getBusinessPayList() {
    this.loading = true;
    const { data } = await getBusinessPayList(this.businessListQuery);
    this.businessPayList = data;
    this.total = data.length;
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  private async searchBusinessPayList(param: any) {
    this.loading = true;
    const { data } = await searchBusinessPayList(param);
    this.businessPayList = data;
    this.total = data.length;
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
}
</script>
