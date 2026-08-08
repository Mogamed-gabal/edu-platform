import { ValidationPipe, INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { TransformInterceptor } from './shared/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

export function setupApp(app: INestApplication): INestApplication {
  app.use(helmet());

  app.enableCors({
    origin: true,
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Edu Platform API Description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  return app;
}
