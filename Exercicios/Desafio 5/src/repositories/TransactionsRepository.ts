import { response } from 'express';
import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  type: 'income' | 'outcome';
  title: string;
  value: number;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (acc: Balance, item: Transaction) => {
        switch (item.type) {
          case 'income':
            acc.income += item.value;
            break;
          case 'outcome':
            acc.outcome += item.value;
            break;
          default:
            break;
        }

        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    if (type === 'outcome' && this.getBalance().total < value) {
      throw Error("You can't create this transaction");
    }

    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
