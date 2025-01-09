import { User } from "../models/user.js"
import { Cart } from "../services/CartServices.js"
import { AppError } from "../utils/errorHandler.js"



async function getCartItemsController(req, res, next){
    try{
        const { id } = req.user
        const user = await User.findById(id).select('cart').populate('cart')
        res.status(200).json({success: true, cart: user})
    }catch(err){
        next(err)
    }
}

async function addItemToCartController(req, res, next){
    try{
        const { id } = req.user
        const { products } = req.body
        const updatedCart = await Cart.addToCart(id, products)
        if(!updatedCart) throw new AppError("Error adding item to cart", 500)
        res.status(201).json({success: true, cart: updatedCart})
    }catch(err){
        next(err)
    }
}

async function removeItemFromCartController(req, res, next){
    try{
        const { id } = req.user
        const { id: productId } = req.params
        const [error, deletedCart]= await Cart.removeFromCart(id, productId)
        if(error) return next(error)
        res.status(200).json({success: true, message: "Item removed from cart"})
    }catch(err){
        next(err)
    }
}

async function updateItemController(req, res, next){
    try{
        const { id } = req.user
        const { id: productId } = req.params
        const { quantity } = req.body
        const [ error, updatedCart ] = await Cart.updateQuantity(id, productId, quantity)
        if(error) return next(error)
        res.status(200).json({success: true, cart: updatedCart})
    }catch(err){
        next(err)
    }
}



export {
    getCartItemsController,
    addItemToCartController,
    removeItemFromCartController,
    updateItemController
}