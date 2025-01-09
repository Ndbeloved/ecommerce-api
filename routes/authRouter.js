import express from "express"
import { loginController, registerController } from "../controllers/userController.js"
import { validateLoginMiddleware, validateUserMiddleware } from "../middleware/validateUser.js"
import { isAuthenticated } from "../middleware/isAuthenticated.js"

const router = express.Router()


/**
 * @route POST /api/auth/register
 * @descr Create a new user
 * @access Public
 * @body {Object} user - User details {first_name, last_name, email, password, etc...}
 * @status 201 - Success
 * @status 500 - Server Error
*/
router.post('/register', validateUserMiddleware, registerController)

/**
 * @route POST /api/auth/login
 * @descr Login a user
 * @access Public
 * @body {Object} - Field details {email, password}
 * @status 200 - Success
 * @status 500 - Server Error
*/
router.post('/login', validateLoginMiddleware, loginController)

router.get('/test', isAuthenticated, (req, res)=> res.status(200).json({message: "all good", user: req?.user}))


export { router as authRouter }