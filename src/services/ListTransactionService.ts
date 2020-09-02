import TransactionsRepository from '../repositories/TransactionsRepository';

class ListTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): any {
    const transaction = this.transactionsRepository.all();
    return transaction;
  }
}

export default ListTransactionService;
