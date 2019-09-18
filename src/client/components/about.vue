<template>
  <div class="about-wrapper">
    <span class="head">
      <h1>About</h1>
    </span>

    <Divider />
    <div v-if="loaded" class="about">
      <div class="text truncate">
        <Row>
          <Col span="24">{{info.description}}</Col>
        </Row>
        <a class="subtitle" @click="toggleText">{{btnText}}</a>
      </div>

      <Row>
        <Col span="6" class="cell">
          <div class="subtitle">CEO</div>
          <div>{{info.CEO}}</div>
        </Col>
        <Col span="6" class="cell">
          <div class="subtitle">Website</div>
          <div>
            <a :href="info.website">{{info.website}}</a>
          </div>
        </Col>
        <Col span="6" class="cell">
          <div class="subtitle">Industry</div>
          <div>{{info.industry}}</div>
        </Col>
        <Col span="6" class="cell">
          <div class="subtitle">Employees</div>
          <div>{{info.employees}}</div>
        </Col>
      </Row>
      <Row>
        <Col span="6" class="cell">
          <div class="subtitle">Market Cap</div>
          <div>{{info.marketcap | numToWord}}</div>
        </Col>
        <Col span="6" class="cell">
          <div class="subtitle">PE Ratio</div>
          <div>{{info.peRatio}}</div>
        </Col>
        <Col span="6" class="cell">
          <div class="subtitle">Dividend Yield</div>
          <div>{{info.dividendYield | toFixed}}</div>
        </Col>
        <Col span="6" class="cell">
          <div class="subtitle">Next Earnings Date</div>
          <div>{{info.nextEarningsDate}}</div>
        </Col>
      </Row>
      <Row>
        <Col span="6" class="cell">
          <div class="subtitle">52 Week High</div>
          <div>${{info.week52high}}</div>
        </Col>
        <Col span="6" class="cell">
          <div class="subtitle">52 Week Low</div>
          <div>${{info.week52low}}</div>
        </Col>
      </Row>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import IEX from "./../api/IEX";
export default {
  name: "about",
  props: {
    company: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      info: {},
      loaded: false,
      textTrunc: true
    };
  },
  async beforeMount() {
    this.info = await IEX.getCompanyInfo(this.company);
    console.log(this.info);
    this.loaded = true;
  },
  methods: {
    toggleText() {
      let text = document.querySelector(".text");
      text.classList.toggle("truncate");
      this.textTrunc = !this.textTrunc;
    }
  },
  computed: {
    btnText() {
      return this.textTrunc ? "Read more" : "Read less";
    }
  },
  watch: {
    company: async function(val) {
      this.info = await IEX.getCompanyInfo(this.company);
      this.loaded = true;
    }
  },
  filters: {
    numToWord: function(num) {
      if (num !== "-") {
        return Number(num) >= 1.0e9
          ? (Number(num) / 1.0e9).toFixed(2) + "B"
          : Number(num) >= 1.0e6
          ? (Number(num) / 1.0e6).toFixed(2) + "M"
          : Number(num) >= 1.0e3
          ? (Number(num) / 1.0e3).toFixed(2) + "K"
          : Number(num);
      } else return num;
    },
    toFixed: function(num) {
      if (num !== "-") {
        return num.toFixed(2);
      } else return num;
    }
  }
};
</script>

<style scoped>
.about-wrapper {
  width: 45%;
  line-height: 1.8em;
  height: 4em;
  text-align: left;
  font-size: 1.1em;
}
.head {
  float: left;
  margin-bottom: 10px;
}
.truncate {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 2em;
  height: 6em;
}
.cell {
  margin: 0 0px 12px 0;
  word-wrap: break-word;
}
.subtitle {
  font-weight: bold;
}
</style>