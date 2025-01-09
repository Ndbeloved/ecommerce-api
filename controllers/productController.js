import { isRedisDisonnected, redisClient } from "../config/redisConfig.js"
import { ProductModel } from "../models/productModel.js"
import { Cache } from "../services/getCachedData.js"
import { ProductService } from "../services/ProductServices.js"
import { uploadToCloudinary } from "../services/uploadCloudinary.js"
import { AppError } from "../utils/errorHandler.js"


async function getAllProductsController(req, res, next){
    try{
        const cachekey = req.cachekey || null
        console.log("--------cache miss--------")
        const allProducts = await ProductModel.find()
        !isRedisDisonnected && cachekey && await redisClient.set(cachekey, JSON.stringify(allProducts), { EX: 3600 })
        res.status(200).json({success: true, products: allProducts})
    }catch(err){
        console.log(err)
        next(err)
    }
}


async function getSingleProductController(req, res, next){
    try{
        const id = req.params.id
        const product = await ProductModel.findById(id)
        res.status(200).json({success: true, product})
    }catch(err){
        next(err)
    }
}


async function addProductController(req, res, next){
    try{
        const cachekey = "all_products"
        const files = req.files
        const uploadedUrls = await Promise.all(files.map(file => uploadToCloudinary(file.buffer)))
        const { name, description, price, quantityStock, category, discount, brand, tags, ratings, sku } = req.body
        const productData = {
            name,
            description: description || null,
            price: price ? parseFloat(price).toFixed(2) : 0,
            quantityStock: quantityStock ? parseInt(quantityStock) : 1,
            category,
            discount: discount ? parseInt(discount) : 0,
            brand: brand,
            tags,
            ratings,
            sku,
            images: uploadedUrls
        }

        //invalidate cache
        const invalidated = await Cache.delete(cachekey)
        if(!invalidated) throw new AppError("Error invalidating cache",500)
        const [error, data] = await ProductService.create(productData)
        if(error) next(error)
        res.status(200).json({success: true, product: data})
    }catch(err){
        next(err)
    }
}



async function updateProductController(req, res, next){
    try{
        const {id} = req.params
        const { name, description, price, quantityStock, category, discount, brand, tags, ratings, sku } = req.body
        const updateData = {name, description, price, quantityStock, category, discount, brand, tags, ratings, sku}
        const filter = { _id: id}
        const [err, _] = await ProductService.updateMany(filter, updateData)
        if(err) throw new AppError("Error updating product", 500)
        res.status(200).json({success: true, message: "Item updated successfully"})
    }catch(err){
        next(err)
    }
}



async function updateProductImageController(req, res, next){
    try{
        const files = req.files
        const { imageUrl } = req.body
        if(!files) throw new AppError("Provide atleast one image file", 400)
            res.status(200).json({success: true, message: "Image updated successfully"})
    }
    catch(err){
        next(err)
    }
}



async function deleteProductController(req, res, next) {
    try{
        const { id } = req.params
        const deletedProduct = await ProductModel.findByIdAndDelete(id)
        if(!deletedProduct) throw new AppError("Couldn't find specified product", 404)
        res.status(204).json({success: true})
    }catch(err){
        next(err)
    }
}


export {
    getAllProductsController,
    getSingleProductController,
    addProductController,
    updateProductController,
    updateProductImageController,
    deleteProductController
}