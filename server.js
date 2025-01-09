import express from "express"
import { v2 as cloudinary } from "cloudinary"
import { globalErrorHandler } from "./utils/errorHandler.js"
import morgan from "morgan"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"
import { authRouter } from "./routes/authRouter.js"
import { notFoundController } from "./controllers/notFoundController.js"
import { productRoute } from "./routes/productRouter.js"
import { cartRoute } from "./routes/cartRouter.js"
dotenv.config()



const app = express()
const PORT = process.env.PORT || 5000
const DB_URL = process.env.MONGO_URL
app.use(morgan("dev"))
app.use(express.json())

cloudinary.config({
    cloud_name: process.env.CLOUD_API_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

//routes
app.use('/api/auth', authRouter)
app.use('/api/products', productRoute)
app.use('/api/cart', cartRoute)


app.all('*', notFoundController)

//catch all error handler
app.use(globalErrorHandler)

connectDB(app, DB_URL, PORT)