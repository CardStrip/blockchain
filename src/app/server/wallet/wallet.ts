import { Injectable } from '@nestjs/common';

import { Blockchain } from '../blockchain';
import { ChainUtil } from '../chain.util';
import { INITIAL_BALANCE } from '../config';
import { Transaction, TransactionPool } from '../transaction';

@Injectable()
export class Wallet {
    public address: string;
    public balance = INITIAL_BALANCE;
    public keyPair: any;
    public publicKey: string;

    public static blockchainWallet() {
        const wallet = new Wallet();
        wallet.address = 'blockchain-wallet';
        return wallet;
    }

    constructor() {
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    public sign(dataHash: string): string {
        return this.keyPair.sign(dataHash);
    }

    public createTransaction(recipient: string, amount: number, blockchain: Blockchain, transactionPool: TransactionPool) {
        this.balance = this.calculateBalance(blockchain);

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

    public calculateBalance(blockchain: Blockchain) {
        let balance = this.balance;

        const transactions = [];
        blockchain.chain.forEach(block => {
            block.data.forEach(transaction => {
                transactions.push(transaction);
            });
        });
        const walletInputTs = transactions
            .filter(transaction => transaction.input.address === this.publicKey);

        let startTime = 0;

        if ( walletInputTs.length > 0 ) {
            const recentInputT = walletInputTs.reduce(
                (prev, current) => prev.input.timestamp > current.input.timestamp ? prev : current,
            );
            balance = recentInputT.outputs.find(output => output.address === this.publicKey).amount;
            startTime = recentInputT.input.timestamp;
        }

        transactions.forEach(transaction => {
            if (transaction.input.timestamp > startTime) {
                transaction.outputs.find(output => {
                    if (output.address === this.publicKey) {
                        balance += output.amount;
                    }
                });
            }
        });

        return balance;
    }
    public toString() {
        return `wallet:
  publicKey : ${this.publicKey.toString()}
  balance   : ${this.balance}
`;
    }

}