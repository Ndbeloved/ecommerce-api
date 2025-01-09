import { User } from "../models/user.js"
import { Cart } from "../services/CartServices.js"
import { UserService } from "../services/UserServices.js"
import { AppError } from "../utils/errorHandler.js"
import { JWT } from "../utils/jwtServices.js"
import { comparePassword } from "../utils/passwordUtils.js"

async function registerController(req, res, next){
    try{
        const { first_name, last_name, email, password } = req.body
        const newUser = {
            first_name,
            last_name,
            email,
            password
        }
        const user = await UserService.createUser(newUser)
        await Cart.init(user)
        res.status(201).json({success: true, userID: user._id})
    }catch(err){
        next(err)
    }
}

async function loginController(req, res, next){
    try{
        const { email, password } = req.body
        //fetch user with email
        const user = await User.findOne({email})
        if (!user) return res.status(404).json({success: false, message: "email or password is incorrect"})
        //check if password associated with req is same
        const passwordCorrect = comparePassword(password, user.password, user.salt)
        if(!passwordCorrect) return res.status(403).json({success: false, message: "email or password is incorrect"})
        //sign jwt using the user object
        const payload = {
            id: user._id,
            email: user.email,
            username: `${user.first_name} ${user.last_name}`
        }
        const token = JWT.sign(payload)
        res.status(200).json({success: true, message: "Login successful", token})
    }catch(err){
        next(err)
    }
}


export { 
    registerController,
    loginController,
}