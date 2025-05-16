const express = require('express');
const redis = require('redis');

const app = express();
const PORT = process.env.PORT || 3000;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

const redisClient = redis.createClient({
  url: `redis://default:${REDIS_PASSWORD}@redis-service:6379`
});

redisClient.connect()
  .then(() => console.log('Connected to Redis!'))
  .catch(err => console.error('Redis connection error:', err));

app.get('/', async (req, res) => {
  try {
    let visits = await redisClient.get('visits');
    visits = parseInt(visits || '0') + 1;
    await redisClient.set('visits', visits);
    res.send(`Number of visits: ${visits}`);
  } catch (err) {
    console.error('Error with Redis:', err);
    res.status(500).send('Something went wrong.');
  }
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

