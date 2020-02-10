<template>
  <div class="terminal-wrap">
    <Card class="terminal">
      <!-- <p slot="title">Buy {{info.symbol}}</p> -->
      <p slot="title" class="title">
        <Tabs :animated="false" v-model="activeTab">
          <eyeButton
            v-if="!readyToOrder && !ownShare()"
            slot="extra"
            :symbol="this.info.symbol"
          />
          <TabPane
            v-if="!readyToOrder"
            :label="tabBuyLabel"
            name="Buy"
            :index="1"
            >${{ fundsAvailable | formatNumber }} available</TabPane
          >
          <TabPane
            v-if="ownShare() && !readyToOrder"
            :label="tabSellLabel"
            name="Sell"
            :index="2"
            >{{ sharesOwned }} available to sell</TabPane
          >
        </Tabs>
      </p>

      <div v-if="!readyToOrder && !ordering">
        <div class="terminal-row">
          <div class="row-name">Shares</div>
          <div>
            <input
              type="number"
              min="0"
              onkeypress="return !(event.charCode == 46)"
              v-model="totalShares"
              class="input"
              placeholder="0"
            />
          </div>
        </div>
        <div class="terminal-row">
          <div class="row-name" style="margin-right: 0;">
            <Poptip content="hello" placement="left-end">
              Market Price
              <a>
                <Icon type="ios-information-circle-outline" />
              </a>
              <div slot="title">This is the latest reported price</div>
              <div slot="content">
                Your order will be processed using the best bid/ask price from
                IEX
              </div>
            </Poptip>
          </div>
          <div class="row-value">${{ info.price }}</div>
        </div>
        <div class="terminal-row">
          <div class="row-name">Estimated {{ costOrCredit }}</div>
          <div class="row-value">${{ totalCost }}</div>
        </div>
        <div class="button">
          <Button type="success" size="large" @click="orderReview"
            >Review Order</Button
          >
        </div>
      </div>

      <div v-if="readyToOrder && !ordering" class="order-window">
        <div class="terminal-row" style="font-weight: bold;">
          Place a market order to {{ this.activeTab.toLowerCase() }}
          {{ totalShares }} {{ shareSpelling }} of {{ info.symbol }}
        </div>
        <div class="button-order">
          <Button type="success" size="large" @click="orderPlace"
            >Place Order</Button
          >
        </div>
        <div class="button-cancel">
          <Button type="error" size="large" @click="orderReset">Cancel</Button>
        </div>
      </div>

      <div v-if="ordering">
        <Spin size="large" class="spin"></Spin>
        <div>Looking for the best price</div>
      </div>
    </Card>
  </div>
</template>

<script>
import DB from "./../api/DB";
import IEX from "./../api/IEX";
import eyeButton from "./../components/button-watchlist";
import moment from "moment-timezone";
import { setTimeout } from "timers";

export default {
  components: {
    eyeButton
  },
  name: "Terminal",
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      totalShares: 0,
      readyToOrder: false,
      ordering: false,
      activeTab: "Buy",
      eyeColor: ""
    };
  },
  beforeMount() {},
  methods: {
    orderReview() {
      if (
        this.totalShares <= 0 ||
        !Number.isInteger(parseFloat(this.totalShares))
      ) {
        this.$Message.warning("Please enter a valid number of shares");
        return;
      } else if (
        this.activeTab === "Buy" &&
        this.user.balance < this.totalCost
      ) {
        this.$Message.error("You don't have enough funds");
        return;
      } else if (
        this.activeTab === "Sell" &&
        this.totalShares > this.sharesOwned
      ) {
        this.$Message.error("You don't have enough shares to place the order");
        return;
      } else {
        this.readyToOrder = true;
      }
    },
    orderReset() {
      this.readyToOrder = false;
      this.totalShares = 0;
      this.ordering = false;
      this.activeTab = "Buy";
    },
    async orderPlace() {
      this.ordering = true;
      let time = Math.random() * 3000 + 2000;
      let latestPrice = await IEX.getLatestPrice(this.info.symbol);
      let totalCost = parseFloat((this.totalShares * latestPrice).toFixed(2));
      setTimeout(async () => {
        if (this.activeTab === "Buy") {
          await DB.buyShares(
            this,
            this.info.symbol,
            this.totalShares,
            totalCost,
            this.ownShare()
          );
          setTimeout(() => {
            this.$Modal.success({
              title: `Latest ask price: $${latestPrice}`,
              content: `Bought ${this.totalShares} ${this.shareSpelling} of ${this.info.symbol} for a total of $${totalCost}`,
              okText: "Done"
            });
            this.orderReset();
          }, 2000);
        } else {
          await DB.sellShares(
            this,
            this.info.symbol,
            this.totalShares,
            totalCost
          );
          setTimeout(() => {
            this.$Modal.success({
              title: `Latest bid price: $${latestPrice}`,
              content: `Sold ${this.totalShares} ${this.shareSpelling} of ${this.info.symbol} for a total of $${totalCost}`,
              okText: "Done"
            });
            this.orderReset();
          }, 2000);
        }
      }, time);
    },
    ownShare() {
      let res = this.user.holdings.findIndex(obj => {
        return obj.symbol === this.info.symbol;
      });
      return res !== -1;
    }
  },
  computed: {
    isMarketOpen() {
      return IEX.isMarketOpen;
    },
    user() {
      return this.$store.getters.GET_USER;
    },
    totalCost() {
      return parseFloat(this.totalShares * (this.info.price || 0)).toFixed(2);
    },
    tabBuyLabel() {
      return "Buy " + this.info.symbol;
    },
    tabSellLabel() {
      return "Sell " + this.info.symbol;
    },
    sharesOwned() {
      let portfolio = this.user.holdings;
      for (let i in portfolio) {
        if (portfolio[i].symbol == this.info.symbol) {
          return portfolio[i].quantity;
        }
      }
    },
    fundsAvailable() {
      if (this.user.balance) {
        return this.user.balance;
      } else return 0;
    },
    shareSpelling() {
      if (this.totalShares > 1) return "shares";
      else return "share";
    },
    costOrCredit() {
      return this.activeTab == "Buy" ? "cost" : "credit";
    }
  },
  filters: {
    formatNumber(num) {
      return Number(num)
        .toFixed(2)
        .toString()
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    }
  },
  watch: {
    $route: function() {
      this.readyToOrder = false;
      this.totalShares = 0;
      this.activeTab = "Buy";
    }
  }
};
</script>

<style scoped>
.terminal-wrap {
  width: 300px;
}
.terminal {
  width: 100%;
  height: 100%;
  background-color: inherit;
}
.order-window {
  margin-top: 10%;
}
.title {
  height: 70px;
}
.input {
  width: 60px;
  background-color: inherit;
  border: 1px solid;
  border-color: rgb(209, 205, 205);
  border-radius: 3px;
  padding-left: 8px;
  height: 30px;
  font-size: 0.9em;
}
input:focus {
  outline-width: 0;
  border-color: rgba(86, 138, 237, 0.6);
}
.row-name {
  font-weight: bold;
  padding-top: 6px;
}
.row-value {
  padding-top: 6px;
  font-weight: bold;
}
.terminal-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 60px;
}
.button-cancel {
  margin-top: 5%;
}
.spin {
  position: relative;
  margin-left: 140px;
  margin-top: 80px;
}
.ml12 {
  font-weight: 200;
  font-size: 1.8em;
  text-transform: uppercase;
  letter-spacing: 0.5em;
}

.ml12 .letter {
  display: inline-block;
  line-height: 1em;
}
</style>
