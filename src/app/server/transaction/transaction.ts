import { ChainUtil } from '../chain.util';
import { Wallet } from '../wallet';
import { Input } from './input';
import { Output } from './output';
import { MINING_REWARD } from '../config';

export class Transaction {
    public id: string;
    public input: Input = null;
    public outputs: Output[];
    public signature: string;

    private static transactionWithOutputs(sender: Wallet, outputs: Output[]) {
        const transaction = new Transaction();
        transaction.outputs.push(...outputs);
        Transaction.sign(transaction, sender);

        return transaction;
    }

    public static newTransaction(sender: Wallet, recipient: string, amount: number) {
        // validates senders balance;
        if (amount > sender.balance) {
            console.warn(`Amount: ${amount} exceeds balance`);
            return;
        }
        // returns new transaction;
        return Transaction.transactionWithOutputs(sender, [
            { amount: sender.balance - amount, address: sender.publicKey },
            { amount, address: recipient },
        ]);
    }

    public static rewardTransaction(miner: Wallet, blockchain: Wallet) {
        return Transaction.transactionWithOutputs(blockchain, [{
            amount: MINING_REWARD,
            address: miner.publicKey,
        }]);
    }

    private static sign(transaction: Transaction, sender: Wallet) {
        transaction.input = {
            timestamp: Date.now(),
            amount: sender.balance,
            address: sender.publicKey,
            signature: sender.sign(ChainUtil.hash(transaction.outputs)),
        };
    }

    public static verify(transaction: Transaction) {
        return ChainUtil.verifySignature (
            transaction.input.address,
            transaction.input.signature,
            ChainUtil.hash(transaction.outputs),
        );
    }

    constructor() {
        this.id = ChainUtil.id();
        this.outputs = [];
    }

    public update(sender: Wallet, recipient: string, amount: number) {
        const senderOutput = this.outputs.find(output => output.address === sender.publicKey);

        // checks if sender can update transaction;
        if (amount > senderOutput.amount ) {
            console.warn(`Amount: ${amount} exceeds balance`);
            return;
        }

        senderOutput.amount = senderOutput.amount - amount;
        this.outputs.push({amount, address: recipient});
        Transaction.sign(this, sender);

        return this;
    }

}