import axios from "axios";
import moment from "moment-timezone";
import config from "../../../config";

export default {
  // isMarketOpen: function() {
  //   const holidays = ["January 1", "January 21", "February 18", "April 19"];
  //   const date = moment().tz("America/New_York");
  //   console.log(typeof date.format("MMMM D"));
  //   const hour = date.hour();
  //   const minute = date.minute();
  //   // const time =
  //   // return (
  //   //   (day > 0 && day < 6) && (ho
  //   // );
  // },
  getSymbols: function() {
    const symbols = [];
    axios
      .get(
        `https://sandbox.iexapis.com/stable/ref-data/symbols?token=${config.IEX.sandbox_token}`
      )
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          let company = {
            symbol: res.data[i]["symbol"],
            name: res.data[i]["name"]
          };
          company["searchLabel"] = company["symbol"] + " - " + company["name"];
          symbols.push(company);
        }
      })
      .catch(err => {
        console.log(err);
        return;
      });
    return symbols;
  },
  getChartData: async function(symbol, period, simplify) {
    const prices = [];
    const dates = [];
    let color = null;
    await axios
      .get(
        `https://sandbox.iexapis.com/stable/stock/${symbol}/chart/${period}?token=${config.IEX.sandbox_token}&chartSimplify=${simplify}`
      )
      .then(res => {
        if (period === "1d") {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].average) {
              dates.push(res.data[i]["label"] + " ET");
              prices.push(res.data[i]["average"].toFixed(2));
            }
          }
        } else {
          for (let i = 0; i < res.data.length; i++) {
            dates.push(moment(res.data[i]["date"]).format("MMM Do YY"));
            prices.push(res.data[i]["close"].toFixed(2));
          }
        }
      })
      .catch(err => {
        console.log(err);
        return;
      });
    color =
      parseFloat(prices[0]) <= parseFloat(prices[prices.length - 1])
        ? "rgb(19, 189, 137)"
        : "rgb(213, 86, 54)";
    return [prices, dates, color];
  },
  getStocksData: async function(list) {
    let symbols = [];
    if (typeof list[0] == "object") {
      for (let i = 0; i < list.length; i++) {
        symbols.push(list[i].symbol);
      }
      symbols = symbols.join(",");
    } else symbols = list.join(",");

    let data = [];
    await axios
      .get(
        `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=quote&filter=symbol,latestPrice,changePercent,companyName&token=${config.IEX.sandbox_token}`
      )
      .then(res => {
        let resData = res.data;
        for (let i in resData) {
          data.push(resData[i]);
        }
      })
      .catch(err => {
        console.log({ err });
        return;
      });
    return data;
  },
  getCompanyInfo: async function(symbol) {
    let info = {};
    await axios
      .get(
        `https://sandbox.iexapis.com/stable/stock/${symbol}/company?token=${config.IEX.sandbox_token}&filter=description,industry,website,CEO,employees`
      )
      .then(res => {
        for (let i in res.data) {
          if (res.data[i] && res.data[i] !== "0") {
            info[i] = res.data[i];
          } else {
            info[i] = "-";
          }
        }
      })
      .catch(err => {
        console.log({ err });
        return;
      });

    await axios
      .get(
        `https://sandbox.iexapis.com/stable/stock/${symbol}/stats?token=${config.IEX.sandbox_token}&filter=marketcap,week52high,week52low,dividendYield,peRatio,nextEarningsDate`
      )
      .then(res => {
        for (let i in res.data) {
          if (res.data[i] && res.data[i] !== "0") {
            info[i] = res.data[i];
          } else {
            info[i] = "-";
          }
        }
      })
      .catch(err => {
        console.log({ err });
        return;
      });
    return info;
  },
  getNews: async function(symbol) {
    let news = [];

    await axios
      .get(
        `https://cloud.iexapis.com/stable/stock/${symbol}/news/last/5?token=${config.IEX.public_token}`
      )
      .then(res => {
        for (let i in res.data) {
          news.push(res.data[i]);
        }
      })
      .catch(err => {
        console.log({ err });
        return;
      });
    return news;
  },
  getLatestPrice: async function(symbol) {
    let price;
    await axios
      .get(
        `https://sandbox.iexapis.com/stable/stock/${symbol}/quote/latestPrice?token=${config.IEX.sandbox_token}`
      )
      .then(res => {
        price = res.data;
      })
      .catch(err => {
        console.log({ err });
        return;
      });
    return parseFloat(price).toFixed(2);
  },
  getRatings: async function(symbol) {
    let ratings = {
      ratingBuy: 0,
      ratingSell: 0,
      ratingHold: 0
    };
    await axios
      .get(
        `https://sandbox.iexapis.com/stable/stock/${symbol}/recommendation-trends/?token=${config.IEX.sandbox_token}&filter=ratingBuy,ratingHold,ratingSell`
      )
      .then(res => {
        if (res.data.length) {
          ratings.ratingBuy = res.data[0].ratingBuy;
          ratings.ratingSell = res.data[0].ratingSell;
          ratings.ratingHold = res.data[0].ratingHold;
        }
      })
      .catch(err => {
        console.log({ err });
        return;
      });
    return ratings;
  },
  getPeers: async function(symbol) {
    let peers = [];
    await axios
      .get(
        `https://sandbox.iexapis.com/stable/stock/${symbol}/peers/?token=${config.IEX.sandbox_token}`
      )
      .then(res => {
        peers = res.data;
      })
      .catch(err => {
        console.log({ err });
        return;
      });
    return peers;
  }
};
