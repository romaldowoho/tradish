const User = require("../models/User");

getUserInfo = function(user) {
  const userInfo = {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    balance: user.balance,
    portfolio: user.portfolio,
    watchlist: user.watchlist,
    transactions: user.transactions
  };
  return userInfo;
};
module.exports.buy = async function(ctx, next) {
  let user = ctx.user;
  let newStock = {
    symbol: ctx.request.body.symbol,
    quantity: parseInt(ctx.request.body.quantity)
  };
  console.log("body   ", ctx.request.body);
  //check if already owns shares and update portfolio
  if (ctx.request.body.doesOwn) {
    for (let i = 0; i < user.portfolio.length; i++) {
      if (user.portfolio[i].symbol == newStock.symbol) {
        user.portfolio[i].quantity += newStock.quantity;
        user.markModified("portfolio");
        break;
      }
    }
  } else {
    user.portfolio.push(newStock);
  }

  //update balance
  console.log("total cost: ", ctx.request.body.totalCost);
  user.balance -= parseFloat(ctx.request.body.totalCost);

  //add transaction
  let transaction = {
    date: new Date(),
    type: "buy",
    symbol: newStock.symbol,
    quantity: newStock.quantity,
    shareCost: (ctx.request.body.totalCost / newStock.quantity).toFixed(2),
    totalCost: ctx.request.body.totalCost,
    currBalance: user.balance
  };
  user.transactions.push(transaction);

  // save
  await user.save();

  const userInfo = getUserInfo(user);
  ctx.body = { userInfo };
};

module.exports.sell = async function(ctx, next) {
  let user = ctx.user;
  let symbol = ctx.request.body.symbol;
  let quantity = parseInt(ctx.request.body.quantity);

  // find and update portfolio
  for (let i = 0; i < user.portfolio.length; i++) {
    if (user.portfolio[i].symbol == symbol) {
      if (user.portfolio[i].quantity == quantity) {
        user.portfolio.splice(i, 1);
        break;
      } else {
        user.portfolio[i].quantity -= quantity;
        user.markModified("portfolio");
        break;
      }
    }
  }
  // update balance
  user.balance += parseFloat(ctx.request.body.totalCost);

  //add transaction
  let transaction = {
    date: new Date(),
    type: "sell",
    symbol: symbol,
    quantity: quantity,
    shareCost: (ctx.request.body.totalCost / quantity).toFixed(2),
    totalCost: ctx.request.body.totalCost,
    currBalance: user.balance
  };
  user.transactions.push(transaction);

  // save
  await user.save();

  const userInfo = getUserInfo(user);
  ctx.body = { userInfo };
};
