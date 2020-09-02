import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface BalanceDTO {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): BalanceDTO {
    return {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;
    let total = 0;

    this.transactions.forEach(trans => {
      const { value } = trans;
      const { type } = trans;

      if (type === 'income') {
        income += value;
      } else {
        outcome += value;
      }

      total = income - outcome;
    });

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }

  public isValidBalance({ value, type }: TransactionDTO): boolean {
    const isValid = !(type === 'outcome' && value > this.getBalance().total);
    return isValid;
  }
}

export default TransactionsRepository;
