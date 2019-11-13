//import Portfolio from "../models/Portfolio";
const Portfolio = require("../models/Portfolio");
const moment = require("moment");
const axios = require("axios");
const config = require("../../../config");

const getHoldingsOnDate = function(date, transactions) {
  let portf = {};
  for (let i = 0; i < transactions.length; i++) {
    let trans = transactions[i];
    let curDate = new Date(trans.date);
    if (date.getTime() >= curDate.getTime()) {
      if (trans.type == "buy") {
        if (trans.symbol in portf) {
          portf[trans.symbol] += trans.quantity;
        } else {
          portf[trans.symbol] = trans.quantity;
        }
      } else {
        portf[trans.symbol] -= trans.quantity;
        if (portf[trans.symbol] == 0) {
          delete portf[trans.symbol];
        }
      }
    } else break;
  }
  return portf;
};

const getDates = function(period) {
  let dates = [];
  let curDate = moment();
  let startDate;
  switch (period) {
    case "1M":
      startDate = moment(curDate).subtract(30, "days");
      while (startDate < curDate) {
        if (startDate.day() > 0 && startDate.day() < 6) {
          dates.push(moment(startDate).format("YYYY-MM-DD"));
        }
        startDate = moment(startDate).add(1, "days");
      }
      break;
    case "1Y":
      startDate = moment(curDate).subtract(365, "days");
      while (startDate < curDate) {
        if (startDate.day() > 0 && startDate.day() < 6) {
          dates.push(moment(startDate).format("YYYY-MM-DD"));
        }
        startDate = moment(startDate).add(7, "days");
      }
      break;
    case "5Y" || "MAX":
      startDate = moment(curDate).subtract(1825, "days");
      while (startDate < curDate) {
        if (startDate.day() > 0 && startDate.day() < 6) {
          dates.push(moment(startDate).format("YYYY-MM-DD"));
        }
        startDate = moment(startDate).add(14, "days");
      }
      break;
  }
  return dates;
};

const getPriceOnDate = async function(symbol, date) {
  let price;
  date = date.replace(/-/g, "");
  console.log("PASSING", symbol, date);
  await axios
    .get(
      `https://sandbox.iexapis.com/stable/stock/${symbol}/chart/date/${date}?chartByDay=true&token=${config.IEX.sandbox_token}`
    )
    .then(res => {
      //   console.log(res.data);
      price = parseFloat(res.data[0].close.toFixed(2));
    })
    .catch(err => {
      console.log(err);
      return;
    });
  console.log(price);
  return price;
};

module.exports.getHistory = async function(ctx, next) {
  let portfolio = await Portfolio.findOne({ user: ctx.user });
  const period = ctx.request.body.period;
  let history = {
    dates: [],
    value: []
  };
  const dates = getDates(period);
  console.log(dates);
  for (let i = 0; i < dates.length; i++) {
    let date = new Date(dates[i]);
    console.log("date", date);
    let portfOnDate = getHoldingsOnDate(date, portfolio.transactions);
    console.log("Portf", portfOnDate);
    if (Object.keys(portfOnDate).length) {
      let valueOnDate = 0;
      for (let stock in portfOnDate) {
        console.log("STOCK", stock);
        let price = await getPriceOnDate(stock, dates[i]);
        valueOnDate += price * parseInt(portfOnDate[stock]);
      }
    }
    history.dates.push(dates[i]);
    history.value.push(parseFloat(valueOnDate.toFixed(2)));
  }
  console.log(history);
  ctx.body = { history };
};

module.exports.getTransactions = async function(ctx, next) {
  let portfolio = await Portfolio.findOne({ user: ctx.user });
  let transactions = portfolio.transactions;
  if (transactions) {
    ctx.body = { transactions };
  }
};
