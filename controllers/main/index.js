const { Router } = require("express");
const { posterService, themeService, viewService } = require("../../services");
const daysController = require("./days");
const searchController = require("./search");
const finderController = require("./finder");
const themesController = require("./themes");
const itemController = require("./item");
const authController = require("./auth");

const mainController = Router();

mainController.get("/", async (req, res, next) => {
  try {
    const posters = await posterService.findAll();
    const themes = await themeService.getForMain();
    const hots = await viewService.getHots();
    res.status(200).json({ posters, themes, hots });
  } catch (err) {
    next(err);
  }
});
mainController.use("/days", daysController);
mainController.use("/search", searchController);
mainController.use("/finder", finderController);
mainController.use("/themes", themesController);
mainController.use("/item", itemController);
mainController.use("/auth", authController);

module.exports = mainController;
