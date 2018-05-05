import { Injectable } from '@nestjs/common';
import { Blockchain } from './blockchain';
import { P2pServer } from './p2p-server';
import { TransactionPool } from './transaction';
import { Wallet } from './wallet';

@Injectable()
export class AppService {
  public blockchain: Blockchain;
  public server: P2pServer;
  public trxPool: TransactionPool;
  public wallet: Wallet;

  constructor() {
    this.blockchain = new Blockchain();
    this.trxPool = new TransactionPool();
    this.server = new P2pServer(this.blockchain, this.trxPool);

    this.wallet = new Wallet();
  }

}