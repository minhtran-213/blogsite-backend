import { Body, Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserRequest } from 'src/user/User.request';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/common/decorators/local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        return this.authService.login(req.user._doc)
    }

    @Post('register')
    @HttpCode(201)
    async register(@Body() request: CreateUserRequest) {
        await this.authService.register(request)
    }
}
