import { Module, Dependencies } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { HistoryOfActionsService } from './history-of-actions.service';
import { HistoryOfActionsController } from './history-of-actions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryOfAction } from './entities/history-of-action.entity';

@Dependencies()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([HistoryOfAction]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (ConfigService) => ({
        type: 'postgres',
        host: ConfigService.get('POSTGRES_HOST'),
        port: ConfigService.get('POSTGRES_PORT'),
        username: ConfigService.get('POSTGRES_USER'),
        password: ConfigService.get('POSTGRES_PASSWORD'),
        database: ConfigService.get('POSTGRES_DB'),
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [HistoryOfActionsController],
  providers: [HistoryOfActionsService],
})
export class HistoryOfActionsModule {}
