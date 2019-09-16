<template>
  <div>在线咨询</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Consult'
})
export default class extends Vue {
  mounted() {
    console.log('1');
  }
}
</script>
