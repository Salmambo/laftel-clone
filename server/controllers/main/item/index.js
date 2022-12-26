const { Router } = require("express");
const { itemService, videoService } = require("../../../services");
const episodesController = require("./episodes");
const reviewsController = require("./reviews");
const relatedController = require("./related");
const { checkAccess } = require("../../../middlewares");

const itemController = Router();

itemController.get("/:itemId", async (req, res, next) => {
  try {
    const item = await itemService.getForDetail(req.params);
    const video = await videoService.getForDetail(item);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
});
itemController.get("/:itemId/episodes", episodesController.get);
itemController.put("/:itemId/episodes", episodesController.put);
itemController.post("/:itemId/reviews", checkAccess, reviewsController.post);
itemController.get("/:itemId/reviews", reviewsController.get);
itemController.put(
  "/:itemId/reviews/:reviewId",
  checkAccess,
  reviewsController.put
);
itemController.delete(
  "/:itemId/reviews/:reviewId/review",
  checkAccess,
  reviewsController.deleteReview
);
itemController.delete(
  "/:itemId/reviews/:reviewId/star",
  checkAccess,
  reviewsController.deleteStar
);
itemController.patch(
  "/:itemId/reviews/:reviewId",
  checkAccess,
  reviewsController.patch
);
itemController.get("/:itemId/related", relatedController.get);

module.exports = itemController;
