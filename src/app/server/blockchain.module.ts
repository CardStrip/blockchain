import { Module } from '@nestjs/common';
import { BlockchainController } from './blockchain.controller';
import { AppService } from './blockchain.service';
import { Blockchain } from './blockchain';
import { MessageServer } from './websocket';
import { TransactionPool } from './transaction';
import { Miner } from './miner';
import { Wallet } from './wallet';

@Module({
  imports: [],
  providers: [
    TransactionPool,
    Blockchain,
    MessageServer,
    Miner,
    Wallet,
    AppService,
  ],
  controllers: [BlockchainController],
})
export class BlockchainModule {}
