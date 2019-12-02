import axios from "axios";

export default {
  getUserInfo: async function(ctx) {
    await axios
      .get("http://localhost:3000/api/getUser", {
        headers: {
          Authorization: `Bearer ${ctx.$cookie.get("tradish-session")}`
        }
      })
      .then(res => {
        if (res.status == 200) {
          const user = res.data.userInfo;
          ctx.$store.dispatch("SET_USER", user);
        }
      })
      .catch(err => {
        console.log({ err });
      });
  },
  buyShares: async function(ctx, symbol, quantity, totalCost, doesOwn) {
    // loading bar start
    ctx.$Loading.start();
    ///////////////////////////
    await axios
      .post("http://localhost:3000/api/buyOrder", {
        Authorization: `Bearer ${ctx.$cookie.get("tradish-session")}`,
        symbol,
        quantity,
        totalCost,
        doesOwn
      })
      .then(res => {
        if (res.status == 200) {
          let timeout = Math.random() * 2000 + 1000;
          setTimeout(() => {
            const user = res.data.portfolioInfo;
            ctx.$store.dispatch("SET_USER", user);
            ctx.$Loading.finish();
          }, timeout);
        }
      })
      .catch(err => {
        console.log({ err });
      });
  },
  sellShares: async function(ctx, symbol, quantity, totalCost) {
    // loading bar start
    ctx.$Loading.start();
    ///////////////////////////
    await axios
      .post("http://localhost:3000/api/sellOrder", {
        Authorization: `Bearer ${ctx.$cookie.get("tradish-session")}`,
        symbol,
        quantity,
        totalCost
      })
      .then(res => {
        if (res.status == 200) {
          let timeout = Math.random() * 2000 + 1000;
          setTimeout(() => {
            const user = res.data.portfolioInfo;
            ctx.$store.dispatch("SET_USER", user);
            ctx.$Loading.finish();
          }, timeout);
        }
      })
      .catch(err => {
        console.log({ err });
      });
  },
  handleWatchlist: function(ctx, symbol, action) {
    axios
      .post("http://localhost:3000/api/handleWatchlist", {
        Authorization: `Bearer ${ctx.$cookie.get("tradish-session")}`,
        symbol,
        action
      })
      .then(res => {
        if (res.status == 200) {
          const user = res.data.portfolioInfo;
          ctx.$store.dispatch("SET_USER", user);
        }
      })
      .catch(err => {
        console.log({ err });
      });
  },
  getPortfolioHistory: async function(ctx) {
    let data;
    await axios
      .post("http://localhost:3000/api/getHistory", {
        Authorization: `Bearer ${ctx.$cookie.get("tradish-session")}`
      })
      .then(res => {
        console.log(res.data.history);
        data = res.data.history;
      })
      .catch(err => {
        console.log({ err });
        return;
      });
    return data;
  },
  getTransactions: async function(ctx) {
    let transactions;
    await axios
      .post("http://localhost:3000/api/getTransactions", {
        Authorization: `Bearer ${ctx.$cookie.get("tradish-session")}`
      })
      .then(res => {
        transactions = res.data.transactions;
      })
      .catch(err => {
        console.log({ err });
        return;
      });
    return transactions;
  }
};
