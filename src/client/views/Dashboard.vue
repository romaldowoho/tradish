<template>
  <div class="dashboard-wrap">
    <div class="chart">
      <ChartDashboard />
    </div>
    <div class="right-card">
      <Portfolio />
    </div>
  </div>
</template>

<script>
import ChartDashboard from "./../components/chart-dashboard";
import Portfolio from "./../components/portfolio";
export default {
  components: {
    ChartDashboard,
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
  width: 864px;
  margin-top: 5%;
}
.right-card {
  display: flex;
  position: relative;
  justify-content: center;
  margin-top: 7.5%;
  width: 576px;
}
@media (max-width: 1024px) {
  .dashboard-wrap {
    flex-wrap: wrap;
  }
  .chart {
    width: 100%;
  }
  .right-card {
    width: 100%;
    margin-top: 0;
  }
}
</style>
