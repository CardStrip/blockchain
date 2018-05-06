import { Blockchain } from '../blockchain';
import { TransactionPool, Transaction } from '../transaction';
import { Wallet } from '../wallet';
import { MessageServer } from '../websocket';
import { Block } from '../block';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Miner {
    constructor(
        public blockchain: Blockchain,
        public transactionPool: TransactionPool,
        public wallet: Wallet,
        public server: MessageServer,
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
