const User = require("../models/User");

module.exports = async function getUser(ctx, next) {
  let user = ctx.user;
  if (!user) {
    ctx.status = 400;
    ctx.body = { error: "User not found" };
    return;
  }

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
  ctx.body = { userInfo };
  next();
};
