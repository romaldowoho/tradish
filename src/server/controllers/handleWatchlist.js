module.exports.handleWatchlist = async function(ctx, next) {
  let user = ctx.user;
  let symbol = ctx.request.body.symbol;
  let action = ctx.request.body.action;
  if (action && action === "add") {
    user.watchlist.push(symbol);
  } else if (action && action == "remove") {
    for (let i = 0; i < user.watchlist.length; i++) {
      if (user.watchlist[i] === symbol) {
        user.watchlist.splice(i, 1);
        break;
      }
    }
  }
  await user.save();

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
};
