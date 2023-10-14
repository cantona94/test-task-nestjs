import { NestFactory } from '@nestjs/core';
import { HistoryOfActionsModule } from './history-of-actions/history-of-actions.module';

async function bootstrap() {
  const history = await NestFactory.create(HistoryOfActionsModule);
  history.enableCors();
  await history.listen(4000);
}
bootstrap();
