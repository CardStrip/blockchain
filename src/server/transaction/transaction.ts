import { ChainUtil } from '../chain.util';
import { Wallet } from '../wallet';

export class Transaction {
    public id: string;
    public input = null;
    public outputs: any[];

    public static newTransaction(sender: Wallet, recipient: string, amount: number) {
        const transaction = new Transaction();

        if (amount > sender.balance) {
            console.warn(`Amount: ${amount} exceeds balance`);
            return;
        }

        transaction.outputs.push(...[
            { amount: sender.balance - amount, address: sender.publicKey },
            { amount, address: recipient },
        ]);

        return transaction;
    }

    constructor() {
        this.id = ChainUtil.id();
        this.outputs = [];
    }

}