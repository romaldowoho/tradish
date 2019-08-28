<template>
  <div class="wrap">
    <h1>Welcome to your dashboard</h1>
    <div class="chart">
      <Chart main="true" />
    </div>
    <div class="periods">
      <a value="1d" class="link" @click="getPrices(symbol, '1d', prices, dates)">1d</a>
      <a value="1m" class="link" @click="getPrices(symbol, '1m', prices, dates)">1m</a>
      <a value="1y" class="link" @click="getPrices(symbol, '1y', prices, dates)">1y</a>
      <a value="5y" class="link" @click="getPrices(symbol, '5y', prices, dates)">5y</a>
    </div>
  </div>
</template>

<script>
import Chart from "./../components/chart";
import api from "./../api/api.js";
export default {
  components: {
    Chart
  },
  // data() {
  //   return {
  //     symbol: this.$store.getters.GET_SYMBOL,
  //     prices: this.$store.getters.GET_PRICES,
  //     dates: this.$store.getters.GET_DATES
  //   };
  // },
  computed: {
    symbol: function() {
      return this.$store.getters.GET_SYMBOL;
    },
    prices: function() {
      return this.$store.getters.GET_PRICES;
    },
    dates: function() {
      return this.$store.getters.GET_DATES;
    }
  },
  methods: {
    getPrices: api.getPrices
  }
};
</script>

<style scoped>
.wrap {
  padding-top: 5%;
}
.chart {
  padding-top: 3%;
  position: relative;
  left: 30%;
}
.periods {
  position: relative;
  left: 30%;
  display: flex;
  justify-content: left;
  padding: 5px;
}
</style>