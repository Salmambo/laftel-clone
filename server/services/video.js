import { videoModel } from "../models";

class VideoService {
  constructor(videoModel) {
    this.videoModel = videoModel;
  }

  async create(videoInfo) {
    await this.videoModel.create(videoInfo);
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
    const withVideoInfo = { title: theme.title, items: [] };
    for (const { _id, title, genre } of theme.items) {
      const { image, story, stars } = await this.videoModel.findByItem(_id);
      withVideoInfo.items.push({ _id, title, genre, image, story, stars });
    }
    return withVideoInfo;
  }
}

const videoService = new VideoService(videoModel);

export default videoService;
