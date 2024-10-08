import { HttpException, Injectable } from '@nestjs/common';

import { AuthPayload } from 'src/common/interface/AuthPayload.interface';
import { CreateUserRequest } from 'src/user/User.request';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/User.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService){}
    
    async register(request: CreateUserRequest) {
        await this.userService.createNewUser(request)
    }

    async validateUser(email: string, password: string) {
        const foundedUser = await this.userService.getUserByEmail(email)
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
            email: user.email,
            id: user._id,
            name: user.firstName
        }

        const token = await this.jwtService.signAsync(authPayload, { expiresIn: '5mins'})
        
        return {
            "accessToken": token
        }
    }
}
