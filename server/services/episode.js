const { episodeModel } = require("../models");

class EpisodeService {
  constructor(episodeModel) {
    this.episodeModel = episodeModel;
  }

  async create(episodeInfo) {
    const { item, link } = await this.episodeModel.create(episodeInfo);
    return { item, link };
  }
  async findByItem({ itemId }) {
    const episodes = await this.episodeModel.findByItem(itemId);
    if (episodes.length === 0) throw new Error("no content");
    return episodes;
  }
}

const episodeService = new EpisodeService(episodeModel);

module.exports = episodeService;
