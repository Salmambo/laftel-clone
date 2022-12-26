const {
  reviewService,
  videoService,
  starService,
} = require("../../../services");

const reviewsController = {
  post: async (req, res, next) => {
    const { content, star } = req.body;
    const videoInfo = {};
    try {
      if (content) {
        const reviewAmount = await reviewService.create(
          req.params,
          req.headers,
          content
        );
        if (reviewAmount) videoInfo.reviewAmount = reviewAmount;
      }
      if (star) {
        const stars = await starService.create(req.params, req.headers, star);
        if (stars) videoInfo.stars = stars;
      }
      await videoService.updateStars(req.params, videoInfo);
      res.status(201).end();
    } catch (err) {
      next(err);
    }
  },
  get: async (req, res, next) => {
    try {
      const reviews = await reviewService.findByItem(req.params, req.headers);
      const reviewsWithStar = await starService.findByItem(
        req.params,
        req.headers,
        reviews
      );
      res.status(200).json(reviewsWithStar);
    } catch (err) {
      next(err);
    }
  },
  put: async (req, res, next) => {
    const { content, star } = req.body;
    try {
      if (content) await reviewService.modify(req.params, req.headers, content);
      if (star) {
        const stars = await starService.modify(req.params, req.headers, star);
        await videoService.updateStars(req.params, { stars });
      }
      res.status(200).end();
    } catch (err) {
      next(err);
    }
  },
  deleteReview: async (req, res, next) => {
    try {
      const reviewAmount = await reviewService.delete(req.params, req.headers);
      await videoService.updateStars(req.params, { reviewAmount });
      res.status(200).end();
    } catch (err) {
      next(err);
    }
  },
  deleteStar: async (req, res, next) => {
    try {
      const stars = await starService.delete(req.params, req.headers);
      await videoService.updateStars(req.params, { stars });
      res.status(200).end();
    } catch (err) {
      next(err);
    }
  },
  patch: async (req, res, next) => {
    try {
      await reviewService.incLikes(req.params);
      res.status(200).end();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = reviewsController;
