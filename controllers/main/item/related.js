const { itemService } = require("../../../services");

const relatedController = {
  get: async (req, res, next) => {
    try {
      const items = await itemService.findByGenre(req.params);
      res.status(200).json(items);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = relatedController;
