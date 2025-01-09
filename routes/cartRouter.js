import express from "express"
import { User } from "../models/user.js"
const router = express.Router()


router.get('/:id', async(req, res, next)=>{
    try{
        const { id } = req.params
        const user = await User.findById(id).populate('cart')
        res.status(200).json({success: true, user})
    }catch(err){
        next(err)
    }
})


export { router as cartRoute}