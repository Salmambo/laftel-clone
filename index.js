require("dotenv").config();
const mongoose = require("mongoose");
const { redisClient } = require("./utils");
const app = require("./app");

const port = process.env.SERVER_PORT || 5000;
const mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB);
mongoose.connection.on("connected", () => console.log("mongoDB connected"));

redisClient.connect();
redisClient.on("connect", () => console.log("redis connected"));

app.listen(port, () => console.log(`server started on ${port}`));
