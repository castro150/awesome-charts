/* eslint-disable */
import Vue from 'vue';
import HighchartsVue from 'highcharts-vue';

import App from './App.vue';

Vue.config.productionTip = false;

global.__configs = {
  achartsServer: 'awesome-charts-server.herokuapp.com'
};

Vue.use(HighchartsVue);

new Vue({
  render: h => h(App),
}).$mount('#app');
