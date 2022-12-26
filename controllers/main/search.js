const { Router } = require("express");
const { itemService } = require("../../services");

const searchController = Router();

searchController.get("/", async (req, res, next) => {
  try {
    const items = await itemService.findByTitle(req.query);
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
});

module.exports = searchController;
