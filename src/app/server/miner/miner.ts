import { Blockchain } from '../blockchain';
import { TransactionPool } from '../transaction';
import { Wallet } from '../wallet';
import { P2pServer } from '../p2p-server';

export class Miner {

    constructor(
        public blockchain: Blockchain,
        public transactionPool: TransactionPool,
        public wallet: Wallet,
        public server: P2pServer,
    ) { }

    public mine() {
        const validTransaction = this.transactionPool.validTransactions();
        // include miner reward;
        // create block for valid transactions;
        // sync chains with server
        // clear the transaction pool
        // broadcase to every miner to clear transaction pools;
    }

}
