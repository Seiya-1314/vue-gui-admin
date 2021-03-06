import Vue from 'vue';
import SvgIcon from '@/components/SvgIcon/index.vue'; // svg component

Vue.component('svg-icon', SvgIcon);

const req = require.context('@/icons/svg/', false, /\.svg$/);
const requireAll = (requireContext: any) =>
  requireContext.keys().map(requireContext);

requireAll(req);
