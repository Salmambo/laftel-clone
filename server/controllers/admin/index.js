const { Router } = require("express");
const itemController = require("./item");
const posterController = require("./poster");
const themeController = require("./theme");
const episodeController = require("./episode");

const adminController = Router();

adminController.use("/item", itemController);
adminController.use("/poster", posterController);
adminController.use("/theme", themeController);
adminController.use("/episode", episodeController);

module.exports = adminController;
