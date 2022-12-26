const { itemModel } = require("../models");

class ItemService {
  constructor(itemModel) {
    this.itemModel = itemModel;
  }

  async create(itemInfo) {
    const item = await this.itemModel.create(itemInfo);
    return item;
  }
  async findByDays() {
    const items = await this.itemModel.findSome({
      updateDay: { $exists: true },
    });
    if (items.length === 0) throw new Error("no content");
    const days = {
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],
    };
    items.forEach((item) => days[item.updateDay].push(item));
    return days;
  }
  async findByTitle({ keyword }) {
    const items = await this.itemModel.findSome({
      title: new RegExp(`(${[...keyword].join(".*")})`),
    });
    if (items.length === 0) throw new Error("no content");
    return items;
  }
  async findByTags({ _id, genre, xgenre, tags, xtags }) {
    const condition = {
      genre: genre || xgenre ? {} : { $exists: true },
      tags: tags || xtags ? {} : { $exists: true },
    };
    if (genre) condition.genre.$all = decode(genre);
    if (xgenre) condition.genre.$nin = decode(xgenre);
    if (tags) condition.tags.$all = decode(tags);
    if (xtags) condition.tags.$nin = decode(xtags);
    if (_id) {
      const items = await this.itemModel.findSome({
        _id: { $lt: _id },
        ...condition,
      });
      if (items.length === 0) throw new Error("no content");
      return items.slice(0, 20);
    } else {
      const items = await this.itemModel.findSome(condition);
      if (items.length === 0) throw new Error("no content");
      return { count: items.length, items: items.slice(0, 20) };
    }
  }
  async getForDetail({ itemId }) {
    const { _id, title, genre, releaseType, isOnly, isAd, isAdult } =
      await this.itemModel.findOne(itemId);
    return { _id, title, genre, releaseType, isOnly, isAd, isAdult };
  }
  async findByGenre({ itemId }) {
    const { genre } = await this.itemModel.findOne(itemId);
    if (genre.length === 0) throw new Error("no content");
    const items = await this.itemModel.findSome({
      _id: { $ne: itemId },
      genre: genre[0],
    });
    return items.slice(0, 6);
  }
}

const itemService = new ItemService(itemModel);

module.exports = itemService;

function decode(str) {
  const result = [];
  let temp = "";
  for (let i = 0; i < str.length; i++) {
    temp += str[i];
    if (str[i] === " " || i === str.length - 1) {
      result.push(decodeURIComponent(Buffer.from(temp, "base64")));
      temp = "";
    }
  }
  return result;
}
