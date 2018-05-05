import { ChainUtil } from '../chain.util';
import { Wallet } from '../wallet';
import { Input } from './input';
import { Output } from './output';

export class Transaction {
    public id: string;
    public input: Input = null;
    public outputs: Output[];
    public signature: string;

    public static newTransaction(sender: Wallet, recipient: string, amount: number) {
        const transaction = new Transaction();

        // validates senders balance;
        if (amount > sender.balance) {
            console.warn(`Amount: ${amount} exceeds balance`);
            return;
        }

        // creates transaction inputs;
        transaction.outputs.push(...[
            { amount: sender.balance - amount, address: sender.publicKey },
            { amount, address: recipient },
        ]);

        // signs transaction;
        Transaction.signTransaction(transaction, sender);

        // returns new transaction;
        return transaction;
    }

    private static signTransaction(transaction: Transaction, sender: Wallet) {
        transaction.input = {
            timestamp: Date.now(),
            amount: sender.balance,
            address: sender.publicKey,
            signature: sender.sign(ChainUtil.hash(transaction.outputs)),
        };
    }
    constructor() {
        this.id = ChainUtil.id();
        this.outputs = [];
    }

}