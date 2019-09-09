<template>
  <div class="terminal-wrap">
    <Card class="terminal">
      <!-- <p slot="title">Buy {{info.symbol}}</p> -->
      <p slot="title" class="title">
        <Tabs :animated="false" v-model="activeTab" :capture-focus="true">
          <TabPane
            v-if="!readyToOrder"
            :label="tabBuyLabel"
            name="Buy"
          >${{fundsAvailable}} available</TabPane>
          <TabPane
            v-if="ownShare && !readyToOrder"
            :label="tabSellLabel"
            name="Sell"
          >{{sharesOwned}} available to sell</TabPane>
        </Tabs>
      </p>

      <div v-if="!readyToOrder">
        <div class="terminal-row">
          <div class="row-name">Shares</div>
          <div>
            <Input type="number" v-model="totalShares" style="width:60px;" />
          </div>
        </div>
        <div class="terminal-row">
          <div class="row-name">Market Price</div>
          <div class="row-value">${{info.price}}</div>
        </div>
        <div class="terminal-row">
          <div class="row-name">Total cost</div>
          <div class="row-value">${{totalCost}}</div>
        </div>
        <div class="button">
          <Button type="success" size="large" @click="orderReview">Review Order</Button>
        </div>
      </div>

      <div v-if="readyToOrder" class="order-window">
        <div
          class="terminal-row"
          style="font-weight: bold;"
        >{{this.activeTab}} {{totalShares}} {{shareSpelling}} of {{info.symbol}} at ${{info.price}} for a total of ${{totalCost}}</div>
        <div class="button-order">
          <Button type="success" size="large" @click="orderPlace">Place Order</Button>
        </div>
        <div class="button-cancel">
          <Button type="error" size="large" @click="orderReset">Cancel</Button>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import axios from "axios";
import DB from "./../api/DB";
export default {
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
      activeTab: "Buy"
    };
  },
  beforeMount() {},
  methods: {
    orderReview() {
      if (this.totalShares > 0 && this.totalShares % 1 == 0) {
        this.readyToOrder = true;
      } else {
        this.$Message.warning("Please enter a valid number of shares");
      }
    },
    orderReset() {
      this.readyToOrder = false;
      this.totalShares = 0;
    },
    orderPlace() {
      console.log("active tab:   ", this.activeTab);
      if (this.activeTab === "Buy") {
        if (this.user.balance >= this.totalCost) {
          DB.buyShares(
            this,
            this.info.symbol,
            this.totalShares,
            this.totalCost,
            this.ownShare
          );
        } else {
          this.$Message.error("You don't have enough funds");
          return;
        }
      } else {
        if (this.totalShares <= this.sharesOwned) {
          DB.sellShares(
            this,
            this.info.symbol,
            this.totalShares,
            this.totalCost
          );
        } else {
          this.$Message.error(
            "You don't have enough shares to place the order"
          );
          return;
        }
      }
      this.orderReset();
    }
  },
  computed: {
    user() {
      return this.$store.getters.GET_USER;
    },
    totalCost() {
      return parseFloat((this.totalShares * (this.info.price || 0)).toFixed(2));
    },
    tabBuyLabel() {
      return "Buy " + this.info.symbol;
    },
    tabSellLabel() {
      return "Sell " + this.info.symbol;
    },
    ownShare() {
      let res = this.user.portfolio.findIndex(obj => {
        return obj.symbol == this.info.symbol;
      });
      return res !== -1;
    },
    sharesOwned() {
      let portfolio = this.user.portfolio;
      for (let i in portfolio) {
        if (portfolio[i].symbol == this.info.symbol) {
          return portfolio[i].quantity;
        }
      }
    },
    fundsAvailable() {
      if (this.user.balance) {
        return parseFloat(this.user.balance.toFixed(2));
      } else return 0;
    },
    shareSpelling() {
      if (this.totalShares > 1) return "shares";
      else return "share";
    }
  },
  watch: {
    activeTab: function(val) {
      console.log(val);
    },
    $route: function() {
      this.readyToOrder = false;
      this.totalShares = 0;
      this.activeTab = "Buy";
    }
    // totalShares: function(val) {
    //   this.totalShares = Math.max(Math.floor(val), 0);
    // }
  }
};
</script>

<style scoped>
.terminal-wrap {
  width: 60%;
}
.terminal {
  width: 100%;
  height: 100%;
}
.order-window {
  margin-top: 10%;
}
.title {
  height: 70px;
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
</style>