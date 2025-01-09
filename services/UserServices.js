import { User } from "../models/user.js";

class UserService{
    static async createUser(userData){
        const newUser = await User.create(userData)
        return newUser
    }
}

export { UserService }