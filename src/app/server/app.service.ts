import { Injectable } from '@nestjs/common';
import { Blockchain } from './blockchain';
import { MessageServer } from './websocket';
import { TransactionPool } from './transaction';
import { Wallet } from './wallet';
import { Miner } from './miner';

@Injectable()
export class AppService {
  constructor(
    public blockchain: Blockchain,
    public server: MessageServer,
    public trxPool: TransactionPool,
    public wallet: Wallet,
    public miner: Miner,
  ) { }

}