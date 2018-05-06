import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  controllers: [AppController],
})
export class AppModule {}
