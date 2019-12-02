<template>
  <div class="ratings-wrapper">
    <span class="head">
      <h1>Analysts ratings</h1>
    </span>
    <Divider />
    <div class="ratings-div">
      <div class="ratings-left">
        <i-circle :percent="percent(ratings.ratingBuy)" :stroke-color="circleColor()">
          <span class="demo-Circle-inner" style="font-size:24px">{{percent(getMaxRating(ratings))}}%</span>
          <p>{{totalVotes}} votes</p>
        </i-circle>
      </div>
      <div class="ratings-right">
        <div class="bar">
          <div style="margin-right: 6px;">Buy</div>
          <Progress :percent="percent(ratings.ratingBuy)" stroke-color="#42b983" status="active" />
        </div>
        <div class="bar">
          <div>Hold</div>
          <Progress
            :percent="percent(ratings.ratingHold)"
            stroke-color="rgb(279,164,13)"
            status="active"
          />
        </div>
        <div class="bar">
          <div style="margin-right: 4px;">Sell</div>
          <Progress
            :percent="percent(ratings.ratingSell)"
            stroke-color="rgb(279,64,13)"
            status="active"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IEX from "./../api/IEX";
export default {
  name: "Ratings",
  props: {
    symbol: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      ratings: {
        ratingBuy: 0,
        ratingSell: 0,
        ratingHold: 0
      }
    };
  },
  async beforeMount() {
    this.ratings = await IEX.getRatings(this.symbol);
  },
  computed: {
    totalVotes() {
      let total =
        this.ratings.ratingBuy +
        this.ratings.ratingSell +
        this.ratings.ratingHold;
      return total;
    }
  },
  methods: {
    async updateRating(val) {
      this.ratings = await IEX.getRatings(val);
    },
    getMaxRating(obj) {
      return Math.max(...Object.values(obj));
    },
    percent(val) {
      return this.totalVotes ? Math.floor((val / this.totalVotes) * 100) : 0;
    },
    circleColor() {
      let max = this.getMaxRating(this.ratings);
      if (max === this.ratings.ratingBuy) return "#42b983";
      else if (max === this.ratings.ratingSell) return "rgb(279,64,13)";
      else return "rgb(279,164,13)";
    }
  },
  watch: {
    symbol(val) {
      this.updateRating(val);
    }
  }
};
</script>

<style scoped>
.ratings-wrapper {
  position: relative;
  width: 90%;
  height: 300px;
}
.ratings-div {
  position: relative;
  width: 100%;
  height: 200px;
}
.head {
  float: left;
  margin-bottom: 10px;
  font-size: 1.1em;
}
.bar {
  display: flex;
  font-weight: bold;
  margin: 5px 0 5px 0;
}
</style>