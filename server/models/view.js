const mongoose = require("mongoose");
const { viewSchema } = require("./schemas");

const viewDB = mongoose.model("views", viewSchema);

class ViewModel {
  constructor(viewDB) {
    this.viewDB = viewDB;
  }

  async create(viewInfo) {
    await this.viewDB.create(viewInfo);
  }
  async findSome(condition, limit) {
    const views = await this.viewDB.find({}).sort(condition).limit(limit);
    return views;
  }
  async updateOne(item, viewInfo) {
    await this.viewDB.updateOne({ item }, viewInfo);
  }
  async findAll() {
    const views = await this.viewDB.find({});
    return views;
  }
}

const viewModel = new ViewModel(viewDB);

module.exports = viewModel;
