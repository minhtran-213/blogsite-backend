import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module, ValidationPipe } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { BlogPostModule } from './blog_post/blog_post.module';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseConfigService } from './common/configs';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule, UserModule, BlogPostModule,
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    }),
  ],
  controllers: [],
  providers: [],  
})
export class AppModule {}
