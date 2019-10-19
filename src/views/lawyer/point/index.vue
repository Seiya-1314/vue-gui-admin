<template>
  <div>
    <ControlBar
      type="point"
      @search="searchLawyerList"
    />
    <Table
      type="point"
      :data="lawcaseSelected"
      :loading="loading"
    />
    <Pagination
      v-show="total > 0"
      :total="total"
      :page.sync="lawcaseQuery.page"
      :limit.sync="lawcaseQuery.limit"
      @pagination="getLawyerList"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ControlBar from '@/components/ControlBar/index.vue';
import Table from '@/components/Table/index.vue';
import Pagination from '@/components/Pagination/index.vue';
import {
  getLawyerList,
  searchLawyerList
} from '@/api/lawyer';

@Component({
  name: 'LawcaseSelected',
  components: {
    ControlBar,
    Table,
    Pagination
  }
})
export default class extends Vue {
  private lawcaseSelected: [];
  private loading: boolean;
  private total: number;
  private lawcaseQuery: Object;

  constructor() {
    super();
    this.lawcaseSelected = [];
    this.loading = false;
    this.total = 0;
    this.lawcaseQuery = {
      page: 1,
      limit: 20
    };
  }

  created() {
    this.getLawyerList();
  }

  private async getLawyerList() {
    this.loading = true;
    const { data } = await getLawyerList(this.lawcaseQuery);
    this.lawcaseSelected = data;
    this.total = data.length;
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  private async searchLawyerList(param: any) {
    this.loading = true;
    const { data } = await searchLawyerList(param);
    this.lawcaseSelected = data;
    this.total = data.length;
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
}
</script>
