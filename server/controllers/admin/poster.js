const { Router } = require("express");
const { posterService } = require("../../services");

const posterController = Router();

posterController.post("/", async (req, res, next) => {
  try {
    await posterService.create(req.body);
    res.status(201).end();
  } catch (err) {
    next(err);
  }
});

module.exports = posterController;
