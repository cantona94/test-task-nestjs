import {
  Controller,
  Get,
  Post,
  Body,
  Dependencies,
  Query,
  Bind,
} from '@nestjs/common';
import { HistoryOfActionsService } from './history-of-action.service';

@Controller('history-of-actions')
@Dependencies(HistoryOfActionsService)
export class HistoryOfActionsController {
  constructor(historyOfActionsService) {
    this.historyOfActionsService = historyOfActionsService;
  }

  @Post()
  @Bind(Body())
  create({ params }) {
    return this.historyOfActionsService.create(
      params.idUser,
      params.typeAction,
    );
  }

  @Get()
  @Bind(Query())
  findWithPagination({ id = 1, page = 1, limit = 3 }) {
    return this.historyOfActionsService.findWithPagination(+id, +page, +limit);
  }
}
