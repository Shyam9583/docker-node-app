const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config");

const app = express();

const postRouter = require("./routes/postRoutes");

const userRouter = require("./routes/userRoutes");

const port = process.env.PORT || 3000;

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

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

app.use(express.json());

app.get("/", (req, res) => {
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
