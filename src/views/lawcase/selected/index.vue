<template>
  <div>
    <ControlBar
      type="lawcase"
      @search="searchSelectedLawcase"
    />
    <Table
      type="lawcase"
      :data="lawcaseSelected"
      :loading="loading"
    />
    <Pagination
      v-show="total > 0"
      :total="total"
      :page.sync="lawcaseQuery.page"
      :limit.sync="lawcaseQuery.limit"
      @pagination="getSelectedLawcase"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ControlBar from '@/components/ControlBar/index.vue';
import Table from '@/components/Table/index.vue';
import Pagination from '@/components/Pagination/index.vue';
import {
  getSelectedLawcase,
  searchSelectedLawcase
} from '@/api/lawcase_selected';

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
    this.getSelectedLawcase();
  }

  private async getSelectedLawcase() {
    this.loading = true;
    const { data } = await getSelectedLawcase(this.lawcaseQuery);
    this.lawcaseSelected = data;
    this.total = data.length;
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  private async searchSelectedLawcase(param: any) {
    this.loading = true;
    const { data } = await searchSelectedLawcase(param);
    this.lawcaseSelected = data;
    this.total = data.length;
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
}
</script>
