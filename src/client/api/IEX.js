import axios from "axios";
import moment from "moment";
import config from "../../../config";

export default {
  getSymbols: function() {
    const symbols = [];
    axios
      .get(
        `https://cloud.iexapis.com/stable/ref-data/symbols?token=${
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
        `https://cloud.iexapis.com/stable/stock/${symbol}/chart/${period}?token=${
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
  }
};
