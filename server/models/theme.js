const mongoose = require("mongoose");
const { themeSchema } = require("./schemas");

const themeDB = mongoose.model("themes", themeSchema);

class ThemeModel {
  constructor(themeDB) {
    this.themeDB = themeDB;
  }

  async create(themeInfo) {
    await this.themeDB.create(themeInfo);
  }
  async findAll() {
    const themes = await this.themeDB.find({});
    return themes;
  }
  async findOne(_id) {
    const theme = await this.themeDB.findOne({ _id });
    return theme;
  }
}

const themeModel = new ThemeModel(themeDB);

module.exports = themeModel;
