import Joi from "joi"
import { model, Schema } from "mongoose"
import crypto from "crypto"
import { hashPassword } from "../utils/passwordUtils.js"



const userSchema = new Schema({
    first_name: {
        type: String,
        required: [true, 'first_name is a required field']
    },
    last_name: {
        type: String,
        required: [true, 'last_name is a required field']
    },
    email: {
        type: String,
        required: [true, 'Email is a required field'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is a required field']
    },
    salt: {
        type: String,
    }
}, {timestamps: true})

userSchema.virtual('cart', {
    ref: 'Cart',
    localField: '_id',
    foreignField: 'user',
    justOne: true
})

userSchema.set('toObject', {virtuals: true})
userSchema.set('toJSON', {virtuals: true})

userSchema.pre("save", function(next){
    if(!this.isModified("password")) return next()
    
    //hash password before initial save
    const { salt, hash } = hashPassword(this.password) 
    this.password = hash
    this.salt = salt
    next()
})

//Joi validation schema for user
const userValidationSchema = Joi.object({
    first_name: Joi.string().min(3).max(30).required(),
    last_name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})

function validateUser(userData){
    const { error } = userValidationSchema.validate(userData)
    if(error){
        throw new Error(error.details[0].message)
    }
}

const User = model('User', userSchema)

export { User, validateUser }