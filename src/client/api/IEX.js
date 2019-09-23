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
      });
    return symbols;
  },
  getChartData: async function(symbol, period) {
    const prices = [];
    const dates = [];
    let color = null;
    await axios
      .get(
        `https://sandbox.iexapis.com/stable/stock/${symbol}/chart/${period}?token=${config.IEX.sandbox_token}`
      )
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i]["minute"] && res.data[i]["average"] !== null) {
            dates.push(res.data[i]["label"] + " ET");
            prices.push(res.data[i]["average"].toFixed(2));
          } else if (res.data[i]["minute"] === undefined) {
            dates.push(moment(res.data[i]["date"]).format("MMM Do YY"));
            prices.push(res.data[i]["close"].toFixed(2));
          }
        }
      })
      .catch(err => {
        console.log(err);
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
        `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=quote&filter=symbol,latestPrice,changePercent&token=${config.IEX.sandbox_token}`
      )
      .then(res => {
        let resData = res.data;
        for (let i in resData) {
          data.push(resData[i]);
        }
      })
      .catch(err => {
        console.log({ err });
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
          if (res.data[i]) {
            info[i] = res.data[i];
          } else {
            info[i] = "-";
          }
        }
      })
      .catch(err => {
        console.log({ err });
      });

    await axios
      .get(
        `https://sandbox.iexapis.com/stable/stock/${symbol}/stats?token=${config.IEX.sandbox_token}&filter=marketcap,week52high,week52low,dividendYield,peRatio,nextEarningsDate`
      )
      .then(res => {
        for (let i in res.data) {
          if (res.data[i]) {
            info[i] = res.data[i];
          } else {
            info[i] = "-";
          }
        }
      })
      .catch(err => {
        console.log({ err });
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
      });
    return price;
  },
  getRatings: function(symbol) {
    let ratings = {};
    axios
      .get(
        `https://sandbox.iexapis.com/stable/stock/${symbol}/recommendation-trends/?token=${config.IEX.sandbox_token}&filter=ratingBuy,ratingHold,ratingSell`
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log({ err });
      });
  }
};
