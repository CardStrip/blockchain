import { Transaction } from './transaction';
import { Wallet } from '../wallet';
import { TransactionPool } from './transaction.pool';

describe('TransactionPool', () => {
    let tp: TransactionPool;
    let wallet: Wallet;
    let transaction: Transaction;

    beforeEach(() => {
        tp = new TransactionPool();
        wallet = new Wallet();
        transaction = wallet.createTransaction('r4nd-4dr355', 50, tp);
    });

    it('should add transaction', () => {
        expect(tp.transactions.find(pTrx => pTrx.id === transaction.id)).toEqual(transaction);
    });

    it('should update updated transaction', () => {
        const oldTrx = JSON.stringify(transaction);
        const transaction2 = transaction.update(wallet, 'n3xt-4ddr35', 75);
        tp.updateOrAddTransaction(transaction2);
        expect(JSON.stringify(tp.transactions.find(t => t.id === transaction2.id))).not.toEqual(oldTrx);
    });

    it('should clear transactions', () => {
        tp.clear();
        expect(tp.transactions).toEqual([]);
    });

    describe('mixes valid and corrupt transactions', () => {
        let validTransactions: Transaction[];

        beforeEach(() => {
            validTransactions = [...tp.transactions];
            for (let i = 0; i < 6; i++) {
                wallet = new Wallet();
                transaction = wallet.createTransaction('r4nd-4dr355', 50, tp);
                if (i % 2 === 0) {
                    transaction.input.amount = 9999;
                } else {
                    validTransactions.push(transaction);
                }
            }
        });

        it('should show difference between valid and corrupt transaction', () => {
            expect(JSON.stringify(tp.transactions)).not.toEqual(JSON.stringify(validTransactions));
        });

        it('should grab valid transactions', () => {
            expect(tp.validTransactions()).toEqual(validTransactions);
        });

    });
});

// describe('', () => {});
// beforeEach(() => {});
// it('', () => {});