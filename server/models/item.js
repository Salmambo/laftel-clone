const mongoose = require("mongoose");
const { itemSchema } = require("./schemas");

const itemDB = mongoose.model("items", itemSchema);

class ItemModel {
  constructor(itemDB) {
    this.itemDB = itemDB;
  }

  async create(itemInfo) {
    const item = await this.itemDB.create(itemInfo);
    return item;
  }
  async findSome(condition) {
    const items = await this.itemDB.find(condition).sort({ _id: -1 });
    return items;
  }
  async findOne(_id) {
    const item = await this.itemDB.findOne({ _id });
    return item;
  }
}

const itemModel = new ItemModel(itemDB);

module.exports = itemModel;
