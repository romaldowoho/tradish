<template>
  <div class="main">
    <div class="chart">
      <Chart :symbol="symbol" @terminalInfo="setTerminalProp" />
    </div>
    <div class="terminal">
      <Terminal :info="terminalInfo" />
    </div>
  </div>
</template>

<script>
import Chart from "./../components/chart";
import Terminal from "./../components/terminal";
export default {
  components: {
    Chart,
    Terminal
  },
  data() {
    return {
      terminalInfo: {}
    };
  },
  computed: {
    symbol() {
      return this.$route.params.symbol;
    }
  },
  methods: {
    setTerminalProp(val) {
      this.terminalInfo = val;
    }
  }
};
</script>

<style scoped>
.main {
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
.terminal {
  display: flex;
  position: relative;
  justify-content: center;
  margin-top: 7%;
  width: 40%;
  right: 8%;
}
</style>