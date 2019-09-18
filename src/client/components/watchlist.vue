<template>
  <div class="terminal-wrap">
    <Card class="watchlist" :padding="0">
      <p slot="title">Watchlist</p>
      <Scroll height="400">
        <CellGroup @on-click="handleClick">
          <Cell
            class="cell"
            v-for="symbol in lastPrices"
            :key="symbol.quote.symbol"
            :title="symbol.quote.symbol"
            :name="symbol.quote.symbol"
            :extra="symbol.quote.latestPrice.toString()"
            :label="(symbol.quote.changePercent * 100).toFixed(2).toString() + '%'"
          />
        </CellGroup>
      </Scroll>
    </Card>
  </div>
</template>

<script>
import IEX from "./../api/IEX";
import moment from "moment-timezone";
export default {
  name: "Watchlist",
  data() {
    return {
      lastPrices: [],
      interval: null
    };
  },
  async mounted() {
    if (this.$route.name === "dashboard" && this.watchlist.length) {
      if (IEX.isMarketOpen) {
        this.interval = setInterval(async () => {
          this.lastPrices = await IEX.getWatchlistData(
            this.$store.getters.GET_USER.watchlist
          );
        }, 5000);
      }
    } else {
      setTimeout(() => {
        this.lastPrices = IEX.getWatchlistData(
          this.$store.getters.GET_USER.watchlist
        );
      }, 1000);
    }
  },
  computed: {
    watchlist() {
      return this.$store.getters.GET_USER.watchlist;
    }
  },
  methods: {
    handleClick(symbol) {
      this.$router.push({ name: "stock-page", params: { symbol } });
    }
  }
};
</script>

<style scoped>
.terminal-wrap {
  position: absolute;
  width: 50%;
}
.watchlist {
  width: 100%;
  height: 500px;
  padding: 0;
}
.cell {
  font-weight: bold;
  text-align: left;
  padding-top: 13px;
  height: 50px;
}
</style>