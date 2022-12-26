const { Router } = require("express");
const mainController = require("./main");
const adminController = require("./admin");

const controller = Router();

controller.use("/main", mainController);
controller.use("/admin", adminController);

module.exports = controller;
