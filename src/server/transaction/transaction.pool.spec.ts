import { Transaction } from './transaction';
import { Wallet } from '../wallet';
import { TransactionPool } from './transaction.pool';

describe('TransactionPool', () => {
    let tp: TransactionPool;
    let wallet: Wallet;
    let trx: Transaction;

    beforeEach(() => {
        tp = new TransactionPool();
        wallet = new Wallet();
        trx = Transaction.newTransaction(wallet, 'r4nd-4dr355', 50 );
        tp.updateOrAddTransaction(trx);
    });

    it('should add transaction', () => {
        expect(tp.transactions.find(pTrx => pTrx.id === trx.id)).toEqual(trx);
    });

    it('should update updated transaction', () => {
        const oldTrx = JSON.stringify(trx);
        const trx2 = trx.update(wallet, 'n3xt-4ddr35', 75);
        tp.updateOrAddTransaction(trx2);
        expect(JSON.stringify(tp.transactions.find(t => t.id === trx2.id))).not.toEqual(oldTrx);
    });

});

// describe('', () => {});
// beforeEach(() => {});
// it('', () => {});