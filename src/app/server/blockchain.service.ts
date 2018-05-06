import { Injectable } from '@nestjs/common';

import { Blockchain } from './blockchain';
import { Miner } from './miner';
import { TransactionPool } from './transaction';
import { Wallet } from './wallet';
import { MessageServer } from './websocket';

@Injectable()
export class BlockchainService {
  constructor(
    public blockchain: Blockchain,
    public server: MessageServer,
    public trxPool: TransactionPool,
    public wallet: Wallet,
    public miner: Miner,
  ) { }

}