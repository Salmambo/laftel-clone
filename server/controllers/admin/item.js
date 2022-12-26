const { Router } = require("express");
const { itemService, viewService, videoService } = require("../../services");

const itemController = Router();

itemController.post("/", async (req, res, next) => {
  const { image, story, ...body } = req.body;
  try {
    const item = await itemService.create(body);
    await viewService.create(item);
    await videoService.create({ item, image, story });
    res.status(201).end();
  } catch (err) {
    next(err);
  }
});

module.exports = itemController;
