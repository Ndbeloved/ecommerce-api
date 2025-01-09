import { isRedisDisonnected } from "../config/redisConfig.js"
import { Cache } from "../services/getCachedData.js"


function redisCacheMiddleware(cacheKey){
    return async(req, res, next)=>{
        try{
            if(isRedisDisonnected) {
                next()
            }
            const [_, cachedData] = await Cache.get(cacheKey)
            if(cachedData){
                console.log("-------cache hit--------")
                return res.status(200).json({success: true, products: cachedData})
            }
            req.cachekey = cacheKey //pass the cachekey to the next middleware
            next()
        }catch(err){
            next(err)
        }
    }
}


export { redisCacheMiddleware }