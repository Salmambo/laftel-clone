const mongoose = require("mongoose");
const { posterSchema } = require("./schemas");

const posterDB = mongoose.model("posters", posterSchema);

class PosterModel {
  constructor(posterDB) {
    this.posterDB = posterDB;
  }

  async create(posterInfo) {
    await this.posterDB.create(posterInfo);
  }
  async findAll() {
    const posters = await this.posterDB.find({});
    return posters;
  }
}

const posterModel = new PosterModel(posterDB);

module.exports = posterModel;
