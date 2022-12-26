const { reviewModel } = require("../models");
const { jwt } = require("../utils");

class ReviewService {
  constructor(reviewModel) {
    this.reviewModel = reviewModel;
  }

  async create({ itemId }, { accesstoken }, content) {
    const { email } = jwt.decode(accesstoken);
    const review = await this.reviewModel.findByItemAuthor(itemId, email);
    if (review) throw new Error("conflict");
    await this.reviewModel.create({
      item: itemId,
      author: email,
      content,
    });
    const result = await this.getAmount(itemId);
    return result;
  }
  async findByItem({ itemId }, { accesstoken }) {
    const reviews = await this.reviewModel.findByItem(itemId);
    if (reviews.length === 0) return { user: {}, reviews: [] };
    if (accesstoken) {
      const { email } = jwt.decode(accesstoken);
      const review = await this.reviewModel.findByItemAuthor(itemId, email);
      return {
        user: review ? review : {},
        reviews: review
          ? reviews.filter(({ _id }) => String(review._id) !== String(_id))
          : reviews,
      };
    }
    return { user: {}, reviews };
  }
  async modify({ reviewId }, { accesstoken }, content) {
    await this.checkAuthor(reviewId, accesstoken);
    await this.reviewModel.updateOne(reviewId, { content });
  }
  async checkAuthor(reviewId, accesstoken) {
    const review = await this.reviewModel.findOne(reviewId);
    const { email } = jwt.decode(accesstoken);
    if (review.author !== email) throw new Error("forbidden");
  }
  async getAmount(itemId) {
    const reviews = await this.reviewModel.findByItem(itemId);
    return reviews.length;
  }
  async delete({ itemId, reviewId }, { accesstoken }) {
    await this.checkAuthor(reviewId, accesstoken);
    await this.reviewModel.deleteOne(reviewId);
    const result = await this.getAmount(itemId);
    return result;
  }
  async incLikes({ reviewId }) {
    await this.reviewModel.updateOne(reviewId, { $inc: { likes: 1 } });
  }
}

const reviewService = new ReviewService(reviewModel);

module.exports = reviewService;
