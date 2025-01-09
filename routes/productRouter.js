import express from "express"
import { addProductController, deleteProductController, getAllProductsController, getSingleProductController, updateProductController } from "../controllers/productController.js"
import { validateProduct } from "../middleware/validateProduct.js"
import { upload } from "../config/multerConfig.js"
import { redisCacheMiddleware } from "../middleware/cacheMiddleware.js"
const router = express()



/**
 * @route GET /api/products
 * @descr Retrieves a list of all products.
 * @access Public
 * @response [Object] products - product details [{ "id": "1", "name": "Product A",...} , {...}]
 * @status 200 - Success
 * @status 500 - Server Error
*/
router.get('/', redisCacheMiddleware("all_products"), getAllProductsController)



/**
 * @route GET /api/products/:id
 * @descr Retrieves the details of a single product by ID
 * @access Public
 * @response Object product - product detail {"id": "1234", "name": "Product A",...}
 * @status 200 - Success
 * @status 500 - Server Error
 */
router.get('/:id', getSingleProductController)



/**
 * @route POST /api/products
 * @descr Adds a new product.
 * @access ADMIN
 * @response [Object] products - product details [{ "id": "1", "title": "Product A",...} , {...}]
 * @status 200 - Success
 * @status 500 - Server Error
*/
router.post('/', upload.array('images'), validateProduct, addProductController)



/**
 * @route PUT /api/products/:id
 * @descr Updates an existing product.
 * @access ADMIN
 * @response Object products - product details { "id": "1", "title": "Updated product ",...}
 * @status 200 - Success
 * @status 500 - Server Error
*/
router.put('/:id', updateProductController)



/**
 * @route DELETE /api/products/:id
 * @descr Delete a product.
 * @access ADMIN
 * @response None
 * @status 204 - Success
 * @status 500 - Server Error
*/
router.delete('/:id', deleteProductController)



export { router as productRoute }