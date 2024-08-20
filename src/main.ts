import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    allowedHeaders: '*',
    methods: '*',
    origin: "*"
  })
  await app.listen(3001)
}
bootstrap()
