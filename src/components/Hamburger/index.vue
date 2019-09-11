<template>
  <div
    :class="[{'is-active': isActive}]"
    @click="handleClick"
  >
    <svg-icon icon-class="hamburger" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'hamburger'
})
export default class extends Vue {
  @Prop({ default: false })
  private isActive!: boolean

  private handleClick() {
    this.$emit('toggleClick')
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  vertical-align: middle;
}
.is-active {
  transform: rotate(180deg);
}
</style>
