<template>
  <div>
    <div class="main-row">
      <div class="chart">
        <Chart :symbol="symbol" @terminalInfo="setTerminalProp" />
      </div>
      <div class="terminal">
        <Terminal :info="terminalInfo" />
      </div>
    </div>
    <div class="rest-row">
      <div class="about-row">
        <About :company="symbol" class="about" />
      </div>
      <div class="news-row">
        <News :company="symbol" class="news" />
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "./../components/chart";
import Terminal from "./../components/terminal";
import About from "./../components/about";
import News from "./../components/news";
export default {
  components: {
    Chart,
    Terminal,
    About,
    News
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
.main-row {
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
.rest-row {
  display: flex;
  flex-direction: column;
}
.about-row,
.news-row {
  position: relative;
  display: flex;
  height: 400px;
}
.about,
.news {
  position: relative;
  margin-top: 80px;
  left: 8%;
}
</style>