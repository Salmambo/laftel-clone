const { viewModel } = require("../models");

class ViewService {
  constructor(viewModel) {
    this.viewModel = viewModel;
  }

  async create(item) {
    await this.viewModel.create({ item });
  }
  async getHots() {
    await resetViews();
    const daily = await this.viewModel.findSome({ dailyView: -1 }, 12);
    for (let i = 0; i < daily.length; i++) {
      await daily[i].populate("item");
    }
    const total = await this.viewModel.findSome({ totalView: -1 }, 30);
    for (let i = 0; i < total.length; i++) {
      await total[i].populate("item");
    }
    return { daily, total };
  }
  async updateViews({ itemId }) {
    await resetViews();
    await this.viewModel.updateOne(itemId, {
      $inc: { dailyView: 1, totalView: 1 },
    });
  }
}

const viewService = new ViewService(viewModel);

module.exports = viewService;

async function resetViews() {
  const views = await viewModel.findAll();
  for (const { item, updatedAt } of views) {
    if (new Date().toDateString() !== updatedAt.toDateString()) {
      await viewModel.updateOne(item, { dailyView: 0 });
    }
  }
}
