const mongoose = require("mongoose");
const { episodeSchema } = require("./schemas");

const episodeDB = mongoose.model("episodes", episodeSchema);

class EpisodeModel {
  constructor(episodeDB) {
    this.episodeDB = episodeDB;
  }

  async create(episodeInfo) {
    const episode = await this.episodeDB.create(episodeInfo);
    return episode;
  }
  async findByItem(item) {
    const episodes = await this.episodeDB.find({ item });
    return episodes;
  }
}

const episodeModel = new EpisodeModel(episodeDB);

module.exports = episodeModel;
