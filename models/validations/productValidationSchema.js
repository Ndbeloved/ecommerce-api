import Joi from "joi"


const productValidationSchema = Joi.object({
    name: Joi.string().min(3).max(200).required().description("product name"),
    description: Joi.string().max(500).optional().description('Detailed description of the product'),
    price: Joi.number().positive().required().description("Price of the product"),
    discount: Joi.number().positive().optional().default(0).description("Discount percentage (0-100)"),
    quantityStock: Joi.number().integer().min(0).required().description("Quantity available in stock"),
    category: Joi.string().required().description("Category of product"),
    brand: Joi.string().optional().description("Brand of product"),
    images: Joi.array().items(
        Joi.object({
            originalname: Joi.string().required().description("Original file name"),
            mimetype: Joi.string().valid('image/jpg', 'image/png', 'image/jpeg').required().description('File type'),
            size: Joi.number().max(5 * 1024 * 1024).required().description("File size")
        })
    ).min(1).required().description("Array of uploaded images"),
    ratings: Joi.number().min(0).max(5).optional().description("Average product rating (0-5)"),
    tags: Joi.array().items(Joi.string()).optional().description("Array of searchable tags"),
    sku: Joi.string().optional().description("Stock keeping unit (SKU) for inventory management")
})

export {productValidationSchema}