import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .setTitle('Test Assignment')
    .setDescription('The test assignment API description')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = configService.getOrThrow<number>('PORT');
  const server = await app.listen(port);

  return server;
}

bootstrap()
  .then((server) => {
    const address = server.address();
    console.log(`Server is running on port ${address?.port}`);
  })
  .catch((error) => {
    console.error(error);
  });
