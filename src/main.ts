import { BadRequestException, ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/error-handling/ExceptionAdvice'
import { NestFactory } from '@nestjs/core'
import { ValidationError } from 'class-validator'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  
  app.enableCors({
    allowedHeaders: '*',
    methods: '*',
    origin: "*"
  })
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]) => {
      const message = errors.map(error => {
        return {
          property: error.property,
          constraints: error.constraints
        }
      })
      return new BadRequestException(message)
    }
  }))
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(3001)
}
bootstrap()
