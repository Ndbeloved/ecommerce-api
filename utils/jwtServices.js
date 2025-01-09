import jwt from "jsonwebtoken"

class JwtService{
    constructor(secret, expiresIn){
        this.secret = secret
        this.expiresIn = expiresIn
    }

    sign(payload){
        return jwt.sign(payload, this.secret, {
            expiresIn: this.expiresIn
        })
    }

    verify(token){
        try{
            return jwt.verify(token, this.secret)
        }catch(err){
            return null
        }
    }
}

const jwtsecret = process.env.JWT_SECRET || "secret-jwt"
const JWT = new JwtService(jwtsecret, '1h')

export { JwtService, JWT }