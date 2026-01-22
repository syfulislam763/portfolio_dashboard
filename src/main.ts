import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
}
bootstrap();
