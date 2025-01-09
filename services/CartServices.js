import { CartModel } from "../models/CartModel.js";
import { AppError } from "../utils/errorHandler.js";

class Cart{
    static async init(createdUser){
        try{
            await CartModel.create({
                user: createdUser._id,
                items: []
            })
            return true
        }catch(err){
            throw new AppError("Failed to initialize user cart", 500)
        }
    }
}

export { Cart }