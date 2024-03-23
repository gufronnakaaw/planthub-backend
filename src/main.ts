import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './utils/global.exception';

export default async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalFilters(new GlobalExceptionFilter(app.get(HttpAdapterHost)));
  await app.listen(3001);
}
bootstrap();
