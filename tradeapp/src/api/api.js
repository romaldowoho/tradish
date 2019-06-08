import axios from "axios";
import moment from "moment";

export default {
  getSymbols: function(arr) {
    axios
      .get(
        "https://cloud.iexapis.com/stable/ref-data/symbols?token=pk_34cb74a42f4d4470ad6f93215427ba54"
      )
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          let company = {
            symbol: res.data[i]["symbol"],
            name: res.data[i]["name"]
          };
          company["searchLabel"] = company["symbol"] + " - " + company["name"];
          arr.push(company);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  getPrices: function(symbol, period, pricesArray, datesArray) {
    axios
      .get(
        `https://cloud.iexapis.com/stable/stock/${symbol}/chart/${period}?token=pk_34cb74a42f4d4470ad6f93215427ba54`
      )
      .then(res => {
        console.log(res);
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i]["minute"] && res.data[i]["average"] !== null) {
            datesArray.push(res.data[i]["label"] + " ET");
            pricesArray.push(res.data[i]["average"]);
          } else if (res.data[i]["minute"] === undefined) {
            datesArray.push(moment(res.data[i]["date"]).format("MMM Do YY"));
            pricesArray.push(res.data[i]["close"]);
          }
        }
      });
    return [pricesArray, datesArray];
  }
};
