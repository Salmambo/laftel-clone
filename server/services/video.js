const { videoModel } = require("../models");

class VideoService {
  constructor(videoModel) {
    this.videoModel = videoModel;
  }

  async create(videoInfo) {
    await this.videoModel.create(videoInfo);
  }
  async thumbToImage(items) {
    if (items.items) items.items = await modifyItems(items.items);
    else items = await modifyItems(items);
    return items;
  }
  async getThreeImages(themes) {
    const withImages = [];
    for (const { _id, items, title } of themes) {
      const images = [];
      for (let i = 0; i < 3; i++) {
        const { image } = await this.videoModel.findByItem(items[i]);
        images.push(image);
      }
      withImages.push({ _id, images, title });
    }
    return withImages;
  }
  async getVideoInfo(theme) {
    const withVideoInfo = {
      title: theme.title,
      description: theme.description,
      items: [],
    };
    for (const { _id, title, genre } of theme.items) {
      const { image, story, stars, first } = await this.videoModel.findByItem(
        _id
      );
      withVideoInfo.items.push({
        _id,
        title,
        genre,
        image,
        story,
        stars,
        first,
      });
    }
    return withVideoInfo;
  }
  async getForDetail(item) {
    const { image, story, stars, reviewAmount, first } =
      await this.videoModel.findByItem(item._id);
    return { ...item, image, story, stars, reviewAmount, first };
  }
  async updateStars({ itemId }, stars) {
    await this.videoModel.updateOne(itemId, stars);
  }
  async updateFirst({ item, link }) {
    const { first } = await this.videoModel.findByItem(item);
    if (first === undefined)
      await this.videoModel.updateOne(item, { first: link });
  }
}

const videoService = new VideoService(videoModel);

module.exports = videoService;

async function modifyItems(items) {
  const result = [];
  for (const { _id, title, isOnly, isAdult } of items) {
    const { image } = await videoModel.findByItem(_id);
    result.push({ _id, title, isOnly, isAdult, image });
  }
  return result;
}
