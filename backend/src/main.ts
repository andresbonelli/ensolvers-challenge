import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Andres Bonelli - Ensolvers Challenge')
    .setDescription('Full Stack Implementation Exercise')
    .setVersion('1.0')
    .addTag('note')
    .addTag('user')
    .addTag('user')
    .build();
  config;
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
