<template>
  <div class="chart">
    <h2 class="title is-2 m-40">Awesome Chart!</h2>
    <div class="buttons">
      <button class="button m-s-5"
        :class="{ 'is-primary': rates.USD.active, 'is-light': !rates.USD.active }"
        @click="toggleButton('USD')">USD</button>
      <button class="button m-s-5"
        :class="{ 'is-primary': rates.EUR.active, 'is-light': !rates.EUR.active }"
        @click="toggleButton('EUR')">EUR</button>
      <button class="button m-s-5"
        :class="{ 'is-primary': rates.GBP.active, 'is-light': !rates.GBP.active }"
        @click="toggleButton('GBP')">GBP</button>
    </div>
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
  name: 'Chart',

  props: {
    msg: String,
  },

  data() {
    return {
      rates: {
        USD: {
          data: [],
          active: true,
          color: 'blue',
        },
        EUR: {
          data: [],
          active: true,
          color: 'green',
        },
        GBP: {
          data: [],
          active: true,
          color: 'black',
        },
      },
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
        color: this.rates[currency].color,
        tooltip: {
          // eslint-disable-next-line
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.y}</b><br/>',
          valueDecimals: 2,
        },
      };

      days.forEach(day => newSerie.data.push(data.rates[day].BRL));
      this.chartOptions.series.push(newSerie);
    },

    removeSeries(currency) {
      this.chartOptions.series = this.chartOptions.series.filter(s => s.name !== currency);
    },

    toggleButton(currency) {
      if (this.rates[currency].active) {
        this.removeSeries(currency);
      } else {
        this.addSeries(currency, this.today, this.rates[currency].data);
      }
      this.rates[currency].active = !this.rates[currency].active;
    },
  },

  async created() {
    this.today = Date.now();

    http.getRateData('USD', this.today)
      .then((usdRate) => {
        this.rates.USD.data = usdRate;
        this.addSeries('USD', this.today, usdRate);
      });

    http.getRateData('EUR', this.today)
      .then((eurRate) => {
        this.rates.EUR.data = eurRate;
        this.addSeries('EUR', this.today, eurRate);
      });

    http.getRateData('GBP', this.today)
      .then((gbpRate) => {
        this.rates.GBP.data = gbpRate;
        this.addSeries('GBP', this.today, gbpRate);
      });
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
.m-40 {
  margin: 40px;
}
.m-s-5 {
  margin-right: 5px;
  margin-left: 5px;
}
.buttons {
  margin: 30px;
}
</style>
