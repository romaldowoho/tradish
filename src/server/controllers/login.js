const passport = require("../libs/passport");

module.exports = async function login(ctx, next) {
  await passport.authenticate("local", async (err, user, info) => {
    if (err) throw err;
    console.log(info);
    if (!user) {
      console.log("USER WAS NOT FOUND");
      ctx.status = 400;
      ctx.body = { error: info };
      return;
    }

    const token = await ctx.login(user);

    ctx.body = { token };
  })(ctx, next);
};
