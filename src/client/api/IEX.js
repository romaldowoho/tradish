import axios from "axios";
import moment from "moment-timezone";
import config from "../../../config";

export default {
  getSymbols: function() {
    const symbols = [];
    axios
      .get(
        `https://sandbox.iexapis.com/stable/ref-data/symbols?token=${
          config.IEX.public_token
        }`
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
  getChartData: function(symbol, period) {
    const pricesArray = [];
    const datesArray = [];
    axios
      .get(
        `https://sandbox.iexapis.com/stable/stock/${symbol}/chart/${period}?token=${
          config.IEX.public_token
        }`
      )
      .then(res => {
        console.log(res);
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i]["minute"] && res.data[i]["average"] !== null) {
            datesArray.push(res.data[i]["label"] + " ET");
            pricesArray.push(res.data[i]["average"].toFixed(2));
          } else if (res.data[i]["minute"] === undefined) {
            datesArray.push(moment(res.data[i]["date"]).format("MMM Do YY"));
            pricesArray.push(res.data[i]["close"].toFixed(2));
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
    return [pricesArray, datesArray];
  },
  getWatchlistData: function(list) {
    let symbols = list.join(",");
    let data = [];
    axios
      .get(
        `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=quote&filter=symbol,latestPrice,changePercent&token=${
          config.IEX.public_token
        }`
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
  }
};
