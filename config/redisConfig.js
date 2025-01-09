import redis from "redis"


let errorLogged = false


const redisClient = redis.createClient({
    url: 'redis://127.0.0.1:6379'
})

redisClient.on("ready", ()=>{
    console.log('Connected to Redis')
    errorLogged = false
})

redisClient.on("error", (err)=>{
    if(!errorLogged){
        console.log("Redis error: ",err.message)
        errorLogged = true
    }
})


async function connectToRedis(){
    try{
        await redisClient.connect()
    }catch(err){
        console.log("error: ",err)
    }
}

export { connectToRedis, redisClient, errorLogged as isRedisDisonnected }