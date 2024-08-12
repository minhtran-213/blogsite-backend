import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        JwtModule.register( {
            global: true,
            secret: 'secret'
        }), 
        UserModule
    ],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
