import mongoose from "mongoose";
import { viewSchema } from "./schemas";

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
}

const viewModel = new ViewModel(viewDB);

export default viewModel;