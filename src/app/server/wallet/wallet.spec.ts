import { Transaction, TransactionPool } from '../transaction';
import { Wallet } from './wallet';
import { Blockchain } from '../blockchain';
import { INITIAL_BALANCE } from '../config';

describe('Transaction', () => {
    let blockchain: Blockchain;
    let tp: TransactionPool;
    let wallet: Wallet;

    beforeEach(() => {
        blockchain = new Blockchain();
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
                    wallet.createTransaction(recipient, sendAmount, blockchain, tp);
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

    describe('calculates balance', () => {
        let addBalance: number;
        let repeatAdd: number;
        let sender: Wallet;

        beforeEach(() => {
            sender = new Wallet();
            addBalance = 100;
            repeatAdd = 3;

            for (let i = 0; i < repeatAdd; i++) {
                sender.createTransaction(wallet.publicKey, addBalance, blockchain, tp);
            }

            blockchain.addBlock(tp.transactions);
        });

        it('should match transactions for recipient', () => {
            expect(wallet.calculateBalance(blockchain))
                .toEqual(INITIAL_BALANCE + (addBalance * repeatAdd));
        });

        it('should match transactions for sender', () => {
            expect(sender.calculateBalance(blockchain))
                .toEqual(INITIAL_BALANCE - (addBalance * repeatAdd));
        });
    });

    it('does nothing');
});

// describe('', () => {});
// beforeEach(() => {});
// it('', () => {});