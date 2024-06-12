const client = require('../config/redis')


const cacheItems = async (req, res, next) => {
    try {
      const data = await client.get('items');
      if (data !== null) {
        res.send(JSON.parse(data));
      } else {
        next();
      }
    } catch (err) {
      console.error('Redis error:', err);
      next();
    }
  };

  const cacheItemById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const data = await client.get(`item:${id}`);
      if (data !== null) {
        res.send(JSON.parse(data));
      } else {
        next();
      }
    } catch (err) {
      console.error('Redis error:', err);
      next();
    }
  };

  module.exports = { cacheItems, cacheItemById };