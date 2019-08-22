const Koa = require("koa");
const Router = require("koa-router");
const uuid = require("uuid/v4");
const cors = require("@koa/cors");
const Session = require("./models/Session");
const registration = require("./controllers/register");
const login = require("./controllers/login");
const handleMongooseValidationError = require("./libs/validationErrors");

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

app.use((ctx, next) => {
  ctx.login = async function login(user) {
    const token = uuid();
    await Session.create({ token, user, lastVisit: new Date() });

    return token;
  };

  return next();
});

const router = new Router({ prefix: "/api" });

router.use(async (ctx, next) => {
  const header = ctx.request.get("Authorization");
  if (!header) return next();

  const token = header.split(" ")[1];
  if (!token) return next();

  const session = await Session.findOne({ token }).populate("user");
  if (!session) {
    ctx.throw(401, "Invalid Authenticaion Token");
  }
  session.lastVisit = new Date();
  await session.save();

  ctx.user = session.user;
  return next();
});

router.post("/login", handleMongooseValidationError, login);
router.post("/register", handleMongooseValidationError, registration.register);
router.get("/confirm*", registration.confirm);

app.use(router.routes());

app.listen(3000);
