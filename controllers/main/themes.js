const { Router } = require("express");
const { themeService, videoService } = require("../../services");

const themesController = Router();

themesController.get("/", async (req, res, next) => {
  try {
    const themes = await themeService.findAll();
    const withImages = await videoService.getThreeImages(themes);
    res.status(200).json(withImages);
  } catch (err) {
    next(err);
  }
});
themesController.get("/:themeId", async (req, res, next) => {
  try {
    const theme = await themeService.findOne(req.params);
    const withVideoInfo = await videoService.getVideoInfo(theme);
    res.status(200).json(withVideoInfo);
  } catch (err) {
    next(err);
  }
});

module.exports = themesController;
