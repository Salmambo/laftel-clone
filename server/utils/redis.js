const { createClient } = require("redis");
require("dotenv").config();

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const redisUsername = process.env.REDIS_USERNAME;
const redisPassword = process.env.REDIS_PASSWORD;

const redisClient = createClient({
  url: `redis://${redisUsername}:${redisPassword}@${redisHost}:${redisPort}/0`,
  legacyMode: true,
});

class Redis {
  constructor(redisClient) {
    this.redis = redisClient.v4;
  }

  async set(key, value) {
    const result = await this.redis.set(key, value);
    return result;
  }
  async get(key) {
    const result = await this.redis.get(key);
    return result;
  }
  async del(key) {
    await this.redis.del(key);
  }
}

const redis = new Redis(redisClient);

exports.redisClient = redisClient;
exports.redis = redis;
