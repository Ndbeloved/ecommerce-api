import express from "express"
import { User } from "../models/user.js"
import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { addItemToCartController, getCartItemsController, removeItemFromCartController, updateItemController } from "../controllers/cartController.js"
const router = express.Router()

/**
 * @route GET /api/cart
 * @descr Get a list of all items in a cart
 * @authorization Yes
 * @access User
 * @response Object - 
 * @status 201 - Success
 * @status 500 - Internal server error
 */
router.get('/', isAuthenticated, getCartItemsController)



/**
 * @route POST /api/cart
 * @descr Add a product to cart
 * @authorization Yes
 * @access User
 * @response Object - {"success": true, "cart": {..., "items": [...], ...}
 * @status 201 - Success
 * @status 500 - Internal server error
 */
router.post('/', isAuthenticated, addItemToCartController)



/**
 * @route PUT /api/cart/:id
 * @descr Update item quantity in cart
 * @authorization Yes
 * @access User
 * @response Object
 * @status 201 - Success
 * @status 500 - Internal server error
 */
router.put('/:id', isAuthenticated, updateItemController)



/**
 * @route DELETE /api/cart/:id
 * @descr Remove a product to cart
 * @authorization Yes
 * @access User
 * @response Object - {"success": true, "cart": {..., "items": [...], ...}
 * @status 201 - Success
 * @status 500 - Internal server error
 */
router.delete('/:id', isAuthenticated, removeItemFromCartController)


export { router as cartRoute}