import { model, Schema } from "mongoose";


const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product name is required"]
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, "Product price is required"]
    },
    discount: {
        type: Number,
    },
    quantityStock: {
        type: Number,
        required: [true, "Product quantity stock is required"]
    },
    category: {
        type: String,
        required: [true, "Product category is required"]
    },
    brand: {
        type: String,
        default: "custom"
    },
    images: {
        type: [String],
        required: [true, "Atleast one image is required"]
    },
    ratings: {
        type: Number,
        default: 0,
    },
    tags: {
        type: [String],
    },
    sku: {
        type: String,
    },
}, {timestamps: true})


const ProductModel = model("Product", productSchema)

export { ProductModel }