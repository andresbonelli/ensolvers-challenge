import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors({
  //   origin: [process.env.FRONTEND_HOST ?? 'http://localhost:5173/'],
  // });
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
