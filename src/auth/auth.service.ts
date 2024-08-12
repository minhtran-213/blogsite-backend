import { HttpException, Injectable } from '@nestjs/common';

import { AuthPayload } from 'src/common/interface/AuthPayload.interface';
import { CreateUserRequest } from 'src/user/User.request';
import { User } from 'src/user/User.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(private userService: UserService){}
    
    async register(request: CreateUserRequest) {
        await this.userService.createNewUser(request)
    }

    async validateUser(username: string, password: string) {
        const foundedUser = await this.userService.getUserByUsername(username)
        if (!foundedUser) {
            throw new HttpException("User not found", 404)
        }

        const isMatchedPassword = foundedUser.password === password
        if (isMatchedPassword) {
            const {password, ...user} = foundedUser
            return user
        }
        return null
    }

    async login(user: User) {
        const authPayload : AuthPayload = {
            username: user.username,
            email: user.email,
            id: user._id,
            name: user.firstName
        }
    }
}
