import { Transaction } from './transaction';

export class TransactionPool {
    public transactions: Transaction[];

    constructor() {
        this.transactions = [];
    }

    public updateOrAddTransaction(newTransaction: Transaction){
        const transaction = this.transactions.find(t => t.id === newTransaction.id);

        if (transaction) {
            this.transactions[this.transactions.indexOf(transaction)] = newTransaction;
        } else {
            this.transactions.push(newTransaction);
        }
    }

}