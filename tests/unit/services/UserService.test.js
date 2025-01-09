import { User } from "../../../models/user.js"
import { UserService } from "../../../services/UserServices"



jest.mock('../../../models/user')

describe('UserService', ()=>{
    it('should create a new user', async()=>{
        const userData = {
            first_name: "John",
            last_name: "Doe",
            email: "johndoe@gmail.com",
            password: "password"
        }
        const mockUser = {...userData, id: "12345"}

        User.create.mockResolvedValue(mockUser)
        const result = await UserService.createUser(userData)
        expect(result).toEqual(mockUser)
        expect(User.create).toHaveBeenCalledWith(userData)
    })
})