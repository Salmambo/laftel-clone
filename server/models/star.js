const mongoose = require("mongoose");
const { starSchema } = require("./schemas");

const starDB = mongoose.model("stars", starSchema);

class StarModel {
  constructor(starDB) {
    this.starDB = starDB;
  }

  async create(starInfo) {
    await this.starDB.create(starInfo);
  }
  async updateOne(item, author, starInfo) {
    await this.starDB.updateOne({ item, author }, starInfo);
  }
  async deleteOne(item, author) {
    await this.starDB.deleteOne({ item, author });
  }
  async findByItemAuthor(item, author) {
    const star = await this.starDB.findOne({ item, author });
    return star;
  }
  async findByItem(item) {
    const stars = await this.starDB.find({ item });
    return stars;
  }
}

const starModel = new StarModel(starDB);

module.exports = starModel;
