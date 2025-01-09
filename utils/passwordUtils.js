import crypto from "crypto"

function hashPassword(password, saltLength = 16){
    const salt = crypto.randomBytes(saltLength).toString("hex") //generate a random salt
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString("hex")
    return { salt, hash }
}


function comparePassword(password, hashedPassword, salt){
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString("hex")
    return hash == hashedPassword
}


export { hashPassword, comparePassword }