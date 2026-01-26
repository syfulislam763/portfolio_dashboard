import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  const config = new DocumentBuilder()
  .setTitle("Portfolio API")
  .setDescription("A simple project for portfolio site")
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  app.setGlobalPrefix(process.env.COMMON_PREFIX ?? 'api/v1')

  const document = SwaggerModule.createDocument(app, config)

  if(process.env.MODE_ENV == "development")
    SwaggerModule.setup( 'api/v1/docs', app, document);


  await app.listen(process.env.PORT ?? 3000);

  console.log('Server running on http://localhost:3000');
  console.log("API Prefix: /api/v1")
  console.log('Swagger docs at http://localhost:3000/api/v1/docs');
}
bootstrap();
