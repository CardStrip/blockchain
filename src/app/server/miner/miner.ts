import { Blockchain } from '../blockchain';
import { TransactionPool, Transaction } from '../transaction';
import { Wallet } from '../wallet';
import { P2pServer } from '../p2p-server';
import { Block } from '../block';

export class Miner {

    constructor(
        public blockchain: Blockchain,
        public transactionPool: TransactionPool,
        public wallet: Wallet,
        public server: P2pServer,
    ) { }

    public mine(): Block {
        const validTransactions = this.transactionPool.validTransactions();
        validTransactions.push(
            Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet()),
        );
        const block = this.blockchain.addBlock(validTransactions);
        this.server.sync();
        this.transactionPool.clear();
        this.server.broadcastClearTransactions();

        return block;
    }

}
