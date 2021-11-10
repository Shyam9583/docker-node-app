// dependencies
const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");
const session = require("express-session");
const cors = require("cors");

// local variables
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");

const app = express();

const RedisStore = require("connect-redis")(session);
const redisClient = redis.createClient({ host: REDIS_URL, port: REDIS_PORT });

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const port = process.env.PORT || 3000;
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

// util functions
const connectWithRetry = () => {
  mongoose
    .connect(mongoURL)
    .then(() => console.log("Successfully connected to the database"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

// middlewares
app.enable("trust proxy");
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: true,
      httpOnly: true,
      maxAge: 30000,
    },
  })
);
app.use(express.json());

// routes
app.get("/", (req, res) => {
  console.log("Node ran!");
  res.send({
    name: "Shyam Sahoo",
    age: 24,
    gender: "Male",
    phone: "9777944995",
    pincode: "769003",
  });
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
