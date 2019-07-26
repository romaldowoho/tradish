const Koa = require("koa");
const Router = require("koa-router");
const uuid = require("uuid/v4");
const cors = require("@koa/cors");

const app = new Koa();

app.use(cors());
app.use(require("koa-static")("public"));
app.use(require("koa-bodyparser")());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status) {
      ctx.status = err.status;
      ctx.body = { error: err.message };
    } else {
      console.error(err);
      ctx.status = 500;
      ctx.body = { error: "Internal server error" };
    }
  }
});

app.use(async (ctx, next) => {
  ctx.body = "Hello";
});

app.listen(3000);
