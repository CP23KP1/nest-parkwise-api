import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { contentParser } from 'fastify-multer';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.register(contentParser);

  app.setGlobalPrefix(process.env.API_PREFIX || '/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization, refresh',
  });

  const config = new DocumentBuilder()
    .setTitle('Parkwise API documents')
    .setDescription('The Parkwise API description')
    .setVersion('1.0')
    .addTag('parkwise')
    .addBearerAuth({ in: 'header', type: 'http' })
    .addServer(process.env.SWAGGER_SERVER_URL || 'http://localhost:8080')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/v1/docs', app, document);

  await app.listen(process.env.PORT || 8080, '0.0.0.0');
}
bootstrap();
