import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BlockchainService } from './services/blockchain.service';

@Module({
  imports: [],
  providers: [
    BlockchainService,
  ],
  controllers: [AppController],
})
export class AppModule {}
