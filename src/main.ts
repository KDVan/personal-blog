import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionsFilter } from './helpers/global-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === 'development'
        ? ['log', 'debug', 'error', 'verbose', 'warn']
        : ['error', 'warn'],
  });

  app.useGlobalFilters(new GlobalExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  /* Config swagger */

  const config = new DocumentBuilder()
    .setTitle('KDVan Personal Blog APIs')
    .setDescription('This is the KDVan blog APIs document')
    .setVersion('1.0')
    .setLicense(
      'This project belong to Duy Kh. Van Ba',
      'https://blog.hexon.systems',
    )
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  /* End config swagger */

  const corsConf = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
    optionsSuccessStatus: 204,
    credentials: true,
  };

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(process.env.PORT_ENV);
  console.warn('Server is up!');
}

bootstrap().then();
