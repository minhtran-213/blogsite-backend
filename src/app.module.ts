import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module, ValidationPipe } from '@nestjs/common';

import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { BlogPostModule } from './blog_post/blog_post.module';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule, UserModule, BlogPostModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/blogsite')
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ],
  
})
export class AppModule {}
