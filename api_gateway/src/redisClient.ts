import Redis from 'ioredis';

// hosting redis server

const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort = parseInt(process.env.REDIS_PORT || '6379' , 10 );

const redis = new Redis({
    host : redisHost,
    port : redisPort
});

redis.on('connect',() => {
    console.log(`Connected to Redis at ${redisHost}:${redisPort}`);
});

redis.on('error' ,(err) => {
    console.error(`Redis : ${err}`);
});

export default redis;