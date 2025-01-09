import { JWT } from "../utils/jwtServices.js"

export function isAuthenticated(req, res, next){
    try{
        const token = req.headers.authorization.split(' ')[1]
        const isValid = JWT.verify(token)
        if(!isValid) return res.status(403).json({success: false, message: "Invalid jwt"})
        req.user = isValid
        next()
    }catch(err){
        next(err)
    }
}