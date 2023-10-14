import { NestFactory } from '@nestjs/core';
import { UserModule } from './user/user.module';

async function bootstrap() {
  const userService = await NestFactory.create(UserModule);
  userService.enableCors();
  await userService.listen(3000);
}
bootstrap();
