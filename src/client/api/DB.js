import axios from "axios";

export default {
  getUserInfo: function(ctx) {
    axios
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
  buyShares: function(ctx, symbol, quantity, totalCost, doesOwn) {
    // loading bar start
    ctx.$Loading.start();
    ///////////////////////////
    axios
      .post("http://localhost:3000/api/buyOrder", {
        Authorization: `Bearer ${ctx.$cookie.get("tradish-session")}`,
        symbol,
        quantity,
        totalCost,
        doesOwn
      })
      .then(res => {
        if (res.status == 200) {
          setTimeout(() => {
            const user = res.data.userInfo;
            ctx.$store.dispatch("SET_USER", user);
            ctx.$Loading.finish();
          }, 2000);
        }
      })
      .catch(err => {
        console.log({ err });
      });
  },
  sellShares: function(ctx, symbol, quantity, totalCost) {
    // loading bar start
    ctx.$Loading.start();
    ///////////////////////////
    axios
      .post("http://localhost:3000/api/sellOrder", {
        Authorization: `Bearer ${ctx.$cookie.get("tradish-session")}`,
        symbol,
        quantity,
        totalCost
      })
      .then(res => {
        if (res.status == 200) {
          setTimeout(() => {
            const user = res.data.userInfo;
            ctx.$store.dispatch("SET_USER", user);
            ctx.$Loading.finish();
          }, 2000);
        }
      })
      .catch(err => {
        console.log({ err });
      });
  }
};
