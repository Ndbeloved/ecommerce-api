import { ProductModel } from "../models/productModel.js";

class ProductService{
    static async create(productData){
        try{
            const newProduct = await ProductModel.create(productData)
            return [ null, newProduct]
        }catch(err){
            return [err, null]
        }
    }

    static async updateMany(filter, updateData){
        try{
            //removing fields that are undefined
            const filterData = Object.fromEntries(
                Object.entries(updateData).filter(([_, value])=> value !== undefined)
            )
            const result = await ProductModel.updateMany(
                filter, 
                {$set: filterData}
            )
            return [null, result]
        }
        catch(err){
            return [err, null]
        }
    }
}

export { ProductService }