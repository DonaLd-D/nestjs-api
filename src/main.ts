import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import {AllExceptionsFilter} from './common/exceptions/base.exception.filter';
import {HttpExceptionFilter} from './common/exceptions/http.exception.filter';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(),new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
