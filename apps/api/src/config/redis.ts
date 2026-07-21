import RedisModule from 'ioredis'; import {env} from './env.js';
const RedisClass = typeof RedisModule === 'function' ? RedisModule : (RedisModule as any).default;
export const redis=new RedisClass(env.REDIS_URL,{maxRetriesPerRequest:2});
