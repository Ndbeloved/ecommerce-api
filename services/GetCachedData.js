import { redisClient } from "../config/redisConfig.js"

class Cache{
    static async get(cachekey){
        try{
            const cachedData = await redisClient.get(cachekey)
            return [ null, cachedData]
        }catch(err){
            return [err, null]
        }
    }

    static async delete(cachekey){
        try{
            await redisClient.del(cachekey)
            return true
        }catch(err){
            return false
        }
    }
}

export { Cache }