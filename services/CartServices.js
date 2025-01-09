import { CartModel } from "../models/CartModel.js";
import { ProductModel } from "../models/productModel.js";
import { User } from "../models/user.js";
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

    static async addToCart(userId, products, quantity = 1){
        try {
            let total = 0
            let cart = await CartModel.findOne({ user: userId }) 
            if (!cart) {
                cart = new Cart({ user: userId, items: [] });
            }
            for(const prod of products){
                const product = await ProductModel.findById(prod.productId)
                const itemIndex = cart.items.findIndex((item) => item.productId.toString() === prod.productId)
                if (itemIndex > -1) {
                    cart.items[itemIndex].quantity += prod.quantity;
                } else {
                    cart.items.push({ productId: prod.productId, product: product.name, quantity: prod.quantity, price: product.price * prod.quantity})
                }
                console.log(`${product.price} x ${prod.quantity} = ${product.price * prod.quantity}`)
                total += product.price * prod.quantity
            }
            cart.total += total
            await cart.save();
            return cart;
        } catch (error) {
            console.error('Error updating cart:', error)
            return false
        }
    }

    static async removeFromCart(userId, productId) {
        try {
          const cart = await CartModel.findOne({ user: userId })
      
          if (!cart) {
            throw new AppError("Cart not found for this user", 404)
          }
      
          const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId)
      
          if (itemIndex === -1) {
            throw new AppError("Product not found in the cart", 404)
          }

          const itemToRemove = cart.items[itemIndex]
          cart.total -= itemToRemove.price
      

          cart.items.splice(itemIndex, 1)
      
          await cart.save()
      
          return [null, cart]
        } catch (error) {
          return [error, null]
        }
    }

    static async updateQuantity(userId, productId, quantity){
        try{
            const cart = await CartModel.findOne({user: userId})
            const product = await ProductModel.findById(productId)
            const itemIndex = cart.items.findIndex((item)=> item.productId.toString() === productId)
            if(itemIndex === -1){
                throw new AppError("Product not found in cart", 404)
            }
            const difference = Math.abs(cart.items[itemIndex].quantity - quantity)
            const priceDifference = product.price * difference
            cart.items[itemIndex].quantity = quantity
            cart.items[itemIndex].price = product.price * quantity
            cart.total -= priceDifference
            await cart.save()
            return [null, cart]
        }catch(err){
            return [err, null]
        }
    }
      
}

export { Cart }