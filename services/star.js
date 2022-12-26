const { starModel } = require("../models");
const { jwt } = require("../utils");

class StarService {
  constructor(starModel) {
    this.starModel = starModel;
  }

  async create({ itemId }, { accesstoken }, star) {
    const { email } = jwt.decode(accesstoken);
    const starInfo = await this.starModel.findByItemAuthor(itemId, email);
    if (starInfo) throw new Error("conflict");
    await this.starModel.create({
      item: itemId,
      author: email,
      star,
    });
    const result = await this.avgStars(itemId);
    return result;
  }
  async findByItem({ itemId }, { accesstoken }, reviews) {
    const stars = await this.starModel.findByItem(itemId);
    if (stars.length === 0) return reviews;
    const reviewsWithStar = { user: {}, reviews: [], starsCount: stars.length };
    const findStar = (author) => stars.find((star) => star.author === author);
    if (Object.keys(reviews.user).length) {
      reviewsWithStar.user = {
        _id: reviews.user._id,
        author: reviews.user.author,
        content: reviews.user.content,
        likes: reviews.user.likes,
        createdAt: reviews.user.createdAt,
        updatedAt: reviews.user.updatedAt,
      };
      const star = findStar(reviews.user.author);
      if (star) reviewsWithStar.user.star = star.star;
    } else if (accesstoken) {
      const { email } = jwt.decode(accesstoken);
      const star = findStar(email);
      if (star) {
        reviewsWithStar.user.star = star.star;
        reviewsWithStar.user.author = email;
      }
    }
    for (let i = 0; i < reviews.reviews.length; i++) {
      const { _id, author, content, likes, createdAt, updatedAt } =
        reviews.reviews[i];
      const star = findStar(author);
      if (star) {
        reviewsWithStar.reviews.push({
          _id,
          author,
          content,
          likes,
          createdAt,
          updatedAt,
          star: star.star,
        });
      } else {
        reviewsWithStar.reviews.push({
          _id,
          author,
          content,
          likes,
          createdAt,
          updatedAt,
        });
      }
    }
    return reviewsWithStar;
  }
  async modify({ itemId }, { accesstoken }, star) {
    const { email } = jwt.decode(accesstoken);
    await this.starModel.updateOne(itemId, email, { star });
    const result = await this.avgStars(itemId);
    return result;
  }
  async avgStars(itemId) {
    const stars = await this.starModel.findByItem(itemId);
    if (stars.length === 0) return 0;
    return Number(
      (stars.reduce((acc, { star }) => acc + star, 0) / stars.length).toFixed(2)
    );
  }
  async delete({ itemId }, { accesstoken }) {
    const { email } = jwt.decode(accesstoken);
    await this.starModel.deleteOne(itemId, email);
    const result = await this.avgStars(itemId);
    return result;
  }
}

const starService = new StarService(starModel);

module.exports = starService;
