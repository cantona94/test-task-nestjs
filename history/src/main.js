import { NestFactory } from '@nestjs/core';
import { HistoryOfActionsModule } from './history-of-action/history-of-action.module';

async function bootstrap() {
  const history = await NestFactory.create(HistoryOfActionsModule);
  history.enableCors();
  await history.listen(4000);
}
bootstrap();
