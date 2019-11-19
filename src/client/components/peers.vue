<template>
  <div v-if="this.peersInfo.length" class="peers-wrapper">
    <span class="head">
      <h1>Peers</h1>
    </span>
    <Divider style="width: 300px;" />
    <div
      v-for="peer in peersInfo"
      :key="peer.quote.symbol"
      class="peer-div"
      @click="handleClick(peer.quote.symbol)"
    >
      <Card class="peer-card" :shadow="false" :bordered="true">
        <div class="peer-title">{{peer.quote.companyName}}</div>
        <div
          class="peer-price"
          :style="{color: percentColor(peer.quote.changePercent)}"
        >${{peer.quote.latestPrice}}</div>
        <div
          class="peer-percent"
          :style="{color: percentColor(peer.quote.changePercent)}"
        >{{peer.quote.changePercent | toFixed()}}%</div>
      </Card>
    </div>
  </div>
</template>

<script>
import IEX from "./../api/IEX";
export default {
  name: "peers",
  props: {
    symbol: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      peers: [],
      peersInfo: []
    };
  },
  async created() {
    this.peers = await IEX.getPeers(this.symbol);
    if (this.peers.length > 6) {
      this.peers.splice(6);
    }
    this.peersInfo = await IEX.getStocksData([
      "VSLR",
      "SPWR",
      "FSLR",
      "TSLA",
      "T"
    ]);
  },
  methods: {
    percentColor(val) {
      return val && val.toString()[0] === "-"
        ? "rgb(213, 86, 54)"
        : "rgb(19, 189, 137)";
    },
    handleClick(symbol) {
      console.log(symbol);
      this.$router.push({ name: "stock-page", params: { symbol } });
      window.scrollTo(0, 0);
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
.peers-wrapper {
  display: inline-block;
  width: 100%;
  text-align: left;
}
.head {
  font-size: 1.1em;
  float: left;
  margin-bottom: 10px;
}
.peer-div {
  display: inline-flex;
  margin-bottom: 30px;
}
.peer-card {
  height: 120px;
  width: 150px;
  margin: 10px 40px 0 0px;
  box-shadow: -0.5px -0.5px 5px #bebdbd;
  box-shadow: 0.5px 0.5px 5px #bebdbd;
  background-color: inherit;
}
.peer-card:hover {
  background-color: rgba(153, 152, 152, 0.11);
  cursor: pointer;
}
.peer-title {
  font-weight: bold;
}
.peer-price {
  font-weight: bold;
  font-size: 20px;
  margin: 8px 0 0 0;
}
.peer-percent {
  font-weight: bold;
  margin: 8px 0 0 0;
}
</style>