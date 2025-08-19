import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // thuộc tính chỉ giữ lại các field thuộc DTO
      forbidNonWhitelisted: true, // thuộc tính không có trong DTO sẽ bị từ chối
    }),
  );
  app.setGlobalPrefix('api/v1', { exclude: [''] });
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
  });
  await app.listen(port);
}
bootstrap();
