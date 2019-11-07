<template>
  <div>
    <div class="main-row">
      <div class="chart">
        <Chart :symbol="symbol" @terminalInfo="setTerminalProp" />
      </div>
      <div class="terminal">
        <Terminal :info="terminalInfo" v-if="Object.values(terminalInfo).length" />
      </div>
    </div>
    <div class="rest-row">
      <Row>
        <Col span="14">
          <About :company="symbol" class="about" />
        </Col>
        <Col span="10">
          <Peers :symbol="symbol" class="peers" />
        </Col>
      </Row>
      <Row>
        <Col span="14">
          <News :company="symbol" class="news" />
        </Col>
        <Col span="10">
          <Ratings :symbol="symbol" class="ratings" />
        </Col>
      </Row>
      <!-- <Col span="8">
          
           
      </Col>-->
      <!-- </Row> -->
      <!-- <Row style="width: 700px;">
        <Col span="24">
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <Ratings :symbol="symbol" class="ratings" />
        </Col>
      </Row>-->
      <!-- <Row>
        <Col span="24">
          <Peers :symbol="symbol" class="peers" />
        </Col>
      </Row>-->
    </div>
  </div>
</template>

<script>
import Chart from "./../components/chart";
import Terminal from "./../components/terminal";
import About from "./../components/about";
import News from "./../components/news";
import Ratings from "./../components/ratings";
import Peers from "./../components/peers";
export default {
  components: {
    Chart,
    Terminal,
    About,
    News,
    Ratings,
    Peers
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
  right: 7%;
}
.rest-row {
  display: flex;
  width: 100%;
  flex-direction: column;
}
.about {
  position: relative;
  margin-top: 80px;
  left: 8%;
}
.news {
  position: relative;
  margin-top: 80px;
  left: 8%;
}
.ratings {
  position: relative;
  margin-top: 80px;
  left: 0%;
}
.peers {
  position: relative;
  margin-top: 80px;
}
</style>