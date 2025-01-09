import { model, Schema } from "mongoose";



const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "A userId should be provided"]
    },
    items: [
        {
            productId: {type: String, required: [true, "Product id is required"]},
            product: {type: String, required: [true, "product name is required"]},
            quantity: {type: Number, required: [true, "Product quantity is required"]},
            price: { type: Number, required: [true, "Product price is required"]}
        }
    ],
    total: {
        type: Number,
        default: 0,
    }
})

const CartModel = model('Cart', cartSchema)
export { CartModel }