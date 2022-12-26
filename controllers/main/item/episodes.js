const { episodeService, viewService } = require("../../../services");

const episodesController = {
  get: async (req, res, next) => {
    try {
      const episodes = await episodeService.findByItem(req.params);
      res.status(200).json(episodes);
    } catch (err) {
      next(err);
    }
  },
  put: async (req, res, next) => {
    try {
      await viewService.updateViews(req.params);
      res.status(200).end();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = episodesController;
