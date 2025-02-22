import Redis from 'ioredis';

// Redis 클라이언트 인스턴스를 생성하여 재사용
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
});

export default redis;
