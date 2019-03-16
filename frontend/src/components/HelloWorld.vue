<template>
  <div class="chart">
    <h1>Awesome Chart!</h1>
    <highcharts :constructor-type="'stockChart'" :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import moment from 'moment';
import Highcharts from 'highcharts';
import stockInit from 'highcharts/modules/stock';
import http from '../services/http';

stockInit(Highcharts);

export default {
  name: 'HelloWorld',

  props: {
    msg: String,
  },

  data() {
    return {
      chartOptions: {

        series: [],

      },
    };
  },

  methods: {
    addSeries(currency, date, data) {
      const days = Object.keys(data.rates).sort();
      const firstDay = days[0];

      const newSerie = {
        name: currency,
        data: [],
        pointStart: moment(firstDay, 'YYYY-MM-DD').startOf('day').toDate().getTime(),
        pointInterval: 1000 * 3600 * 24,
        tooltip: {
          // eslint-disable-next-line
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.y}</b><br/>',
          valueDecimals: 2,
        },
      };

      days.forEach(day => newSerie.data.push(data.rates[day].BRL));
      this.chartOptions.series.push(newSerie);
    },
  },

  async created() {
    this.today = Date.now();

    http.getRateData('USD', this.today)
      .then(usdRate => this.addSeries('USD', this.today, usdRate));

    http.getRateData('EUR', this.today)
      .then(eurRate => this.addSeries('EUR', this.today, eurRate));

    http.getRateData('GBP', this.today)
      .then(gbpRate => this.addSeries('GBP', this.today, gbpRate));
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.chart {
  margin-right: 20%;
  margin-left: 20%;
}
</style>
