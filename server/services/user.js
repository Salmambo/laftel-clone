const { userModel } = require("../models");
const { hashPassword, sendMail, jwt, redis } = require("../utils");

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async checkEmail({ email }) {
    const user = await this.findByEmail(email);
    if (user) return false;
    const number = randomNumber();
    const result = await redis.set(email, number);
    await sendMail(email, `다음 인증번호를 입력해주십시오. >> ${number}`);
    return result;
  }
  async checkNumber({ email, number }) {
    const correct = await redis.get(email);
    if (number != correct) throw new Error("bad request");
    await redis.set(email, "certified");
  }
  async join({ email, password, isLaftel, isInfo, isEvent }) {
    const result = await redis.get(email);
    if (result !== "certified") throw new Error("forbidden");
    await redis.del(email);
    const hashed = await hashPassword.hash(password);
    const user = await this.userModel.create({
      email,
      password: hashed,
      isLaftel,
      isInfo,
      isEvent,
    });
    await sendMail(user.email, "라프텔에 가입되었습니다.");
  }
  async login({ email, password }) {
    const user = await this.findByEmail(email);
    if (!user) throw new Error("bad request");
    const result = await hashPassword.compare(password, user.password);
    if (!result) throw new Error("bad request");
    const accesstoken = await jwt.create(
      { email: user.email, role: user.role },
      "1h"
    );
    const refreshtoken = await jwt.create({}, "7d");
    await this.userModel.updateOne(email, { refreshtoken });
    return { accesstoken, refreshtoken, email };
  }
  async findByEmail(email) {
    const user = await this.userModel.findByEmail(email);
    return user;
  }
}

const userService = new UserService(userModel);

module.exports = userService;

function randomNumber() {
  const number = Math.floor(Math.random() * 1000000);
  if (number === 0) return randomNumber();
  return String(number).padStart(6, "0");
}
