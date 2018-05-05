import { Transaction, TransactionPool } from '../transaction';
import { Wallet } from './wallet';

describe('Transaction', () => {
    let tp: TransactionPool;
    let wallet: Wallet;

    beforeEach(() => {
        wallet = new Wallet();
        tp = new TransactionPool();
    });

    describe('should create a transaction', () => {
        let transaction: Transaction;
        let sendAmount: number;
        let recipient: string;

        beforeEach(() => {
            wallet = new Wallet();
            tp = new TransactionPool();
            recipient = 'r4nd0m-4ddr355';
            sendAmount = 50;
            transaction = Transaction.newTransaction(wallet, recipient, sendAmount );

            describe('and doing the same transaction', () => {

                beforeEach(() => {
                    wallet.createTransaction(recipient, sendAmount, tp);
                });

                it('should double `sendAmount` deducted from wallet balance', () => {
                    expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
                        .toEqual(wallet.balance - sendAmount * 2);
                });

                it('should clone `sendAmount` for recipient', () => {
                    expect(transaction.outputs
                            .filter(output => output.address === recipient)
                            .map(output => output.amount))
                        .toEqual([sendAmount, sendAmount]);
                });

            });
        });
    });

    it('does nothing');
});

// describe('', () => {});
// beforeEach(() => {});
// it('', () => {});