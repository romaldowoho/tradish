<template>
  <div class="dashboard-wrap">
    <div class="chart">
      <Chart />
    </div>
    <div class="right-card">
      <Portfolio />
    </div>
  </div>
</template>

<script>
import Chart from "./../components/chart";
import Portfolio from "./../components/portfolio";
export default {
  components: {
    Chart,
    Portfolio
  },
  methods: {},
  computed: {
    symbol: function() {
      return this.$store.getters.GET_CHART_SYMBOL;
    }
  }
};
</script>

<style scoped>
.dashboard-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 700px;
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