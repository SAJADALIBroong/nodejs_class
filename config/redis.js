const redis = require('redis');

const client = redis.createClient();

client.on('error', (err) => {
    console.error('Redis error:', err);
  });


  client.on('connect', () => {
    console.log('Connected to Redis');
  });

  client.connect().catch(console.error); // Ensure the client connects properly


  module.exports = client;