import { INITIAL_BALANCE } from '../config';
import { ChainUtil } from '../chain.util';
import { TransactionPool, Transaction } from '../transaction';

export class Wallet {
    public balance = INITIAL_BALANCE;
    public keyPair: any;
    public publicKey: string;

    constructor() {
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    public sign(dataHash: string): string {
        return this.keyPair.sign(dataHash);
    }

    public createTransaction(recipient: string, amount: number, transactionPool: TransactionPool) {
        if (amount > this.balance) {
            console.warn(`Amount: ${amount} exceeds current balance of ${this.balance}`);
            return;
        }

        let transaction = transactionPool.find(this.publicKey);
        if (transaction) {
            transaction.update(this, recipient, amount);
        } else {
            transaction = Transaction.newTransaction(this, recipient, amount);
            transactionPool.updateOrAddTransaction(transaction);
        }

        return transaction;
    }

    public toString() {
        return `wallet:
  publicKey : ${this.publicKey.toString()}
  balance   : ${this.balance}
`;
    }

}