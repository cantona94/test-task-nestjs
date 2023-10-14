import { Injectable, Dependencies, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HistoryOfAction } from './entities/history-of-action.entity';

@Injectable()
@Dependencies(getRepositoryToken(HistoryOfAction))
export class HistoryOfActionsService {
  constructor(historyOfActionsRepository) {
    this.historyOfActionsRepository = historyOfActionsRepository;
  }

  async create(idUser, typeAction) {
    const history = await this.historyOfActionsRepository.save({
      idUser,
      typeAction,
    });

    return { history };
  }

  async findWithPagination(id, page, limit) {
    const historyOfActions = await this.historyOfActionsRepository.find({
      where: {
        idUser: id,
      },
      order: {
        timeCreatedAction: 'ASC',
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    if (Object.keys(historyOfActions).length === 0) {
      throw new NotFoundException('History of actions not found');
    }

    return historyOfActions;
  }
}
