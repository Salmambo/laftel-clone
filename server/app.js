const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const controller = require("./controllers");
const { errorHandler } = require("./middlewares");

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", controller);

app.use((req, res, next) => next(createError(404)));
app.use(errorHandler);

module.exports = app;
