const { Router } = require("express");
const { episodeService, videoService } = require("../../services");

const episodeController = Router();

episodeController.post("/", async (req, res, next) => {
  try {
    const episode = await episodeService.create(req.body);
    await videoService.updateFirst(episode);
    res.status(201).end();
  } catch (err) {
    next(err);
  }
});

module.exports = episodeController;
