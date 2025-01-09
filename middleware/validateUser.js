import Joi from "joi"
import { validateUser } from "../models/user.js"


const loginValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
})

export function validateUserMiddleware(req, res, next){
    try{
        validateUser(req.body)
        next()
    }
    catch(error){
        res.status(400).json({success: false, error: error.message})
    }
}

export function validateLoginMiddleware(req, res, next){
    const { error } = loginValidationSchema.validate(req.body)
    if(error){
        return res.status(400).json({success: false, error: error.details[0].message})
    }
    next()
}