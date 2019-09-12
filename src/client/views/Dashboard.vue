<template>
  <div class="dashboard-wrap">
    <!-- <h1>Welcome to your dashboard</h1> -->
    <div class="chart">
      <Chart symbol="RUN" />
    </div>
    <div class="right-card">
      <Watchlist />
    </div>
  </div>
</template>

<script>
import Chart from "./../components/chart";
import Watchlist from "./../components/watchlist";
export default {
  components: {
    Chart,
    Watchlist
  },
  methods: {
    handleClick(val) {
      // this.$router.push({
      //   name: "stock-page",
      //   params: { symbol: val }
      // });
      console.log("huhua");
    }
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
.dashboard-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.chart {
  display: flex;
  position: relative;
  justify-content: center;
  width: 40%;
  left: 8%;
  margin-top: 5%;
}
.right-card {
  display: flex;
  position: relative;
  justify-content: center;
  margin-top: 7%;
  width: 40%;
  right: 8%;
}
</style>