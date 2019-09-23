<template>
  <div class="terminal-wrap">
    <Card class="stocks" :padding="0">
      <div class="menu">
        <Menu mode="horizontal" @on-select="activateTab" active-name="portfolio">
          <MenuItem class="menu-item" name="portfolio">Portfolio</MenuItem>
          <MenuItem class="menu-item" name="watchlist">Watchlist</MenuItem>
        </Menu>
      </div>
      <div v-if="activeTab == 'portfolio'">
        <div
          v-for="symbol in portfolio"
          :key="symbol.quote.symbol"
          @click="handleClick(symbol.quote.symbol)"
        >
          <div class="cell">
            <div class="cell-left">
              <div class="cell-left-top">{{symbol.quote.symbol}}</div>
              <div
                class="cell-left-bottom"
              >{{shareQuantity(symbol.quote.symbol)}} {{shareSpelling(shareQuantity(symbol.quote.symbol))}}</div>
            </div>
            <div class="cell-right">
              <div class="cell-right-top">${{symbol.quote.latestPrice}}</div>
              <div
                class="cell-right-bottom"
                :style="{color: percentColor(symbol.quote.changePercent)}"
              >{{symbol.quote.changePercent | toFixed}}%</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeTab == 'watchlist'" class="watchlist">
        <div
          v-for="symbol in watchlist"
          :key="symbol.quote.symbol"
          @click="handleClick(symbol.quote.symbol)"
        >
          <div class="cell">
            <div class="cell-left cell-left-top">{{symbol.quote.symbol}}</div>
            <div class="cell-right">
              <div class="cell-right-top">${{symbol.quote.latestPrice}}</div>
              <div
                class="cell-right-bottom"
                :style="{color: percentColor(symbol.quote.changePercent)}"
              >{{symbol.quote.changePercent | toFixed}}%</div>
            </div>
          </div>
        </div>
      </div>
      <!-- <Scroll height="400">
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
      </Scroll>-->
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
      activeTab: "portfolio",
      portfolio: [],
      watchlist: [],
      interval: null
    };
  },
  async beforeMount() {
    setTimeout(async () => {
      if (this.$store.getters.GET_USER.watchlist.length) {
        this.watchlist = await IEX.getStocksData(
          this.$store.getters.GET_USER.watchlist
        );
      }
      if (this.$store.getters.GET_USER.portfolio.length) {
        this.portfolio = await IEX.getStocksData(
          this.$store.getters.GET_USER.portfolio
        );
      }
    }, 500);
  },
  computed: {},
  methods: {
    handleClick(symbol) {
      this.$router.push({ name: "stock-page", params: { symbol } });
    },
    activateTab(name) {
      this.activeTab = name;
    },
    percentColor(val) {
      return val && val.toString()[0] === "-"
        ? "rgb(213, 86, 54)"
        : "rgb(19, 189, 137)";
    },
    shareQuantity(symbol) {
      if (symbol) {
        let portfolio = this.$store.getters.GET_USER.portfolio;
        let idx = portfolio.findIndex(el => {
          return el.symbol === symbol;
        });
        return portfolio[idx].quantity;
      }
    },
    shareSpelling(quantity) {
      return quantity > 1 ? "shares" : "share";
    }
  },
  filters: {
    toFixed(val) {
      return val ? parseFloat(val).toFixed(2) : Number(0).toFixed(2);
    }
  }
};
</script>

<style scoped>
.terminal-wrap {
  position: absolute;
  width: 50%;
  -ms-overflow-style: none; /* IE 10+ */
  scrollbar-width: none; /* Firefox  */
}
.stocks {
  width: 100%;
  height: 500px;
  padding: 0;
  overflow: auto;
}
.menu-item {
  width: 142.5px;
  font-weight: bold;
}
::-webkit-scrollbar {
  width: 0px; /* Remove scrollbar space */
  background: transparent;
}
.cell {
  width: 100%;
  display: flex;
  height: 70px;
  justify-content: space-between;
}
.cell:hover {
  background-color: rgba(116, 116, 114, 0.082);
  cursor: pointer;
}
.cell-left {
  width: 30%;
  padding-top: 20px;
  padding-bottom: 20px;
}
.cell-left-top {
  font-weight: bold;
}
.cell-right {
  width: 30%;
  padding-top: 20px;
  padding-bottom: 20px;
}
.cell-right-bottom {
  font-size: 0.8em;
}
.cell-left-bottom {
  font-size: 0.8em;
}
</style>