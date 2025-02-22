import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' }); // 테스트용 환경 변수 로드

describe('레디스 연결 테스트', () => {
  let redis: Redis;

  beforeAll(() => {
    redis = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
    });
  });

  afterAll(async () => {
    await redis.quit(); // 테스트 종료 후 Redis 연결 해제
  });

  it('레디스 연결이 되어있으며 set get 성공해야합니다.', async () => {
    await redis.set('살아계신가요', '네 살아있습니다.');
    const value = await redis.get('살아계신가요');

    expect(value).toBe('네 살아있습니다.');
  });
});
