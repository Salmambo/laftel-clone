import { reviewModel } from "../models";
import { jwt } from "../utils";

class ReviewService {
  constructor(reviewModel) {
    this.reviewModel = reviewModel;
  }

  async create({ itemId }, { accesstoken }, body) {
    const { email } = jwt.decode(accesstoken);
    const review = await this.reviewModel.findByItemAuthor(itemId, email);
    if (review) throw new Error("conflict");
    await this.reviewModel.create({
      item: itemId,
      author: email,
      ...body,
    });
    const result = await this.avgStars(itemId);
    return result;
  }
  async findByItem({ itemId }, { accesstoken }) {
    const reviews = await this.reviewModel.findByItem(itemId);
    if (reviews.length === 0) throw new Error("no content");
    if (accesstoken) {
      const { email } = jwt.decode(accesstoken);
      const { _id, star } = await this.reviewModel.findByItemAuthor(
        itemId,
        email
      );
      return { user: { _id, star }, reviews };
    }
    return { reviews };
  }
  async modify({ itemId, reviewId }, { accesstoken }, { content, star }) {
    await this.checkAuthor(reviewId, accesstoken);
    const reviewInfo = {};
    if (content !== undefined) reviewInfo.content = content;
    if (star !== undefined) reviewInfo.star = star;
    await this.reviewModel.updateOne(reviewId, reviewInfo);
    const result = await this.avgStars(itemId);
    return result;
  }
  async checkAuthor(reviewId, accesstoken) {
    const review = await this.reviewModel.findOne(reviewId);
    const { email } = jwt.decode(accesstoken);
    if (review.author !== email) throw new Error("forbidden");
  }
  async avgStars(itemId) {
    const reviews = await this.reviewModel.findByItem(itemId);
    if (reviews.length === 0) return { stars: 0, reviewAmount: 0 };
    return {
      stars: Number(
        (
          reviews.reduce((acc, { star }) => acc + star, 0) / reviews.length
        ).toFixed(2)
      ),
      reviewAmount: reviews.length,
    };
  }
  async delete({ itemId, reviewId }, { accesstoken }) {
    await this.checkAuthor(reviewId, accesstoken);
    await this.reviewModel.deleteOne(reviewId);
    const result = await this.avgStars(itemId);
    return result;
  }
  async incLikes({ reviewId }) {
    await this.reviewModel.updateOne(reviewId, { $inc: { likes: 1 } });
  }
}

const reviewService = new ReviewService(reviewModel);

export default reviewService;
