import { productValidationSchema } from "../models/validations/productValidationSchema.js"
import { AppError } from "../utils/errorHandler.js"

export function validateProduct(req, res, next){
    try{
        const dataToValidate = {
            ...req.body,
            images: req.files.map((file)=>({
                originalname: file.originalname,
                mimetype: file.mimetype,
                size: file.size
            }))
        }
        const { error } = productValidationSchema.validate(dataToValidate, {abortEarly: false})
    
        if(error) throw new AppError(error.details[0].message, 400)
        next()
    }catch(err){
        next(err)
    }
}