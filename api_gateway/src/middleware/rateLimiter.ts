import { Request , Response , NextFunction } from 'express';
import redis from '../redisClient';

// redis for storage since it is shared , if we used stack storage
// i mean implimenting using map data structure or other , it will not be shared if there are other istances of this 

const WINDOW_SIZE = 60; // second
const MAX_REQUESTS = 10; // per window

export async function rateLimiter(req:Request,res:Response,next:NextFunction){
    try{
        const userKey = (req as any).user?.sub ;//|| req.ip;  // identify by userid or ip
        const redisKey = `rate_limit:${userKey}`;

        const current = await redis.incr(redisKey);

        if (current === 1){ // first request we need to set the counter
            await redis.expire(redisKey,WINDOW_SIZE);
        }

        if (current > MAX_REQUESTS){
            return res.status(429).json({
                error : 'Too Many Requests',
                message : `Rate Limit of ${MAX_REQUESTS} per ${WINDOW_SIZE} seconds exceeded`
            });
        }
        next();  // will reach here when its limit does not get exceded   
    }
    catch (err) {
        console.error('Rate limiter error:' , err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}
