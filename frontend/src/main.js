/* eslint-disable */
import Vue from 'vue';
import HighchartsVue from 'highcharts-vue';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import App from './App.vue';

Vue.config.productionTip = false;

global.__configs = {
  achartsServer: 'awesome-charts-server.herokuapp.com'
};

Vue.use(HighchartsVue);
Vue.use(Buefy);

new Vue({
  render: h => h(App),
}).$mount('#app');
