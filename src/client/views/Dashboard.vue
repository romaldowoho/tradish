<template>
  <div class="wrap">
    <h1>Welcome to your dashboard</h1>
    <div class="chart">
      <Chart symbol="RUN" />
      <!-- <ChartSmall :symbol="'RUN'" /> -->
    </div>
  </div>
</template>

<script>
import Chart from "./../components/chart";
import ChartSmall from "./../components/chartSmall";
export default {
  components: {
    Chart,
    ChartSmall
  },
  computed: {
    symbol: function() {
      return this.$store.getters.GET_CHART_SYMBOL;
    },
    prices: function() {
      return this.$store.getters.GET_CHART_PRICES;
    },
    dates: function() {
      return this.$store.getters.GET_CHART_DATES;
    }
  }
};
</script>

<style scoped>
.wrap {
  /* padding-top: 5%; */
}
.chart {
  padding-top: 3%;
  position: relative;
  left: 10%;
}
</style>