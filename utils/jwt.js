const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_KEY;

class Jwt {
  create(payload, exp) {
    return new Promise((res, rej) => {
      jsonwebtoken.sign(
        payload,
        secretKey,
        {
          algorithm: "HS256",
          expiresIn: exp,
          issuer: "laftel",
        },
        (err, token) => {
          if (err) rej(err);
          else res(token);
        }
      );
    });
  }
  verify(token) {
    return new Promise((res, rej) => {
      jsonwebtoken.verify(token, secretKey, (err, decoded) => {
        if (err) rej(err);
        else res(token);
      });
    });
  }
  decode(token) {
    const { payload } = jsonwebtoken.decode(token, { complete: true });
    return payload;
  }
}

const jwt = new Jwt();

module.exports = jwt;
