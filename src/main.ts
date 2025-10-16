import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

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
