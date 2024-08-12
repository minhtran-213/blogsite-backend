import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequest } from 'src/user/User.request';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('login')
    login() {
        
    }

    @Post('register')
    async register(@Body() request: CreateUserRequest) {
        await this.authService.register(request)
    }
}
