const { Router } = require("express");
const { themeService } = require("../../services");

const themeController = Router();

themeController.post("/", async (req, res, next) => {
  try {
    await themeService.create(req.body);
    res.status(201).end();
  } catch (err) {
    next(err);
  }
});

module.exports = themeController;
