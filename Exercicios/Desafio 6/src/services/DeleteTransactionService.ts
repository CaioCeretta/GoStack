import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const foundTransaction = await transactionsRepository.findOne(id);

    if (!foundTransaction) {
      throw new AppError('Unable to find the transaction');
    }

    await transactionsRepository.remove(foundTransaction);
  }
}

export default DeleteTransactionService;
