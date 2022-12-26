const bcrypt = require("bcrypt");
require("dotenv").config();

const salt = Number(process.env.BCRYPT_SALT);

class HashPassword {
  async hash(password) {
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  }
  async compare(password, hashed) {
    const result = await bcrypt.compare(password, hashed);
    return result;
  }
}

const hashPassword = new HashPassword();

module.exports = hashPassword;
