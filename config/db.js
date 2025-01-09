import mongoose from "mongoose";
import { connectToRedis } from "./redisConfig.js";


function connectDB(App, URL,PORT){
    mongoose.connect(URL)
        .then(()=>{
            console.log("Connected to database successfully...")
            App.listen(PORT, ()=>{
                console.log(`Server is running on http://localhost:${PORT}`)
                connectToRedis()
            })
        })
}

export { connectDB }