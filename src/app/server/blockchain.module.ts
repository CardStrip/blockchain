import { Module } from '@nestjs/common';

import { Blockchain } from './blockchain';
import { BlockchainController } from './blockchain.controller';
import { BlockchainService } from './blockchain.service';
import { Miner } from './miner';
import { TransactionPool } from './transaction';
import { Wallet } from './wallet';
import { MessageServer } from './websocket';

@Module({
  imports: [],
  providers: [
    TransactionPool,
    Blockchain,
    MessageServer,
    Miner,
    Wallet,
    BlockchainService,
  ],
  controllers: [BlockchainController],
})
export class BlockchainModule {}
