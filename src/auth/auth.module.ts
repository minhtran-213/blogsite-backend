import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalAuthGuard } from 'src/common/decorators/local-auth.guard';
import { LocalStrategy } from 'src/common/strategy/local.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        PassportModule,
        JwtModule.register( {
            global: true,
            secret: 'secret'
        }), 
        UserModule
    ],
    providers: [AuthService, LocalAuthGuard, LocalStrategy],
    controllers: [AuthController]
})
export class AuthModule {}
