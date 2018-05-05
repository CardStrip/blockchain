import { Body } from '@nestjs/common';
import { Get, Controller, Post } from '@nestjs/common';
import { Blockchain } from './blockchain';
import { Block } from './block';
import { AppService } from './app.service';
import { Transaction } from './transaction';
import { ENGINE_METHOD_DIGESTS } from 'constants';
import { TransactionRequest } from './transaction/transaction.request';

@Controller()
export class AppController {

  constructor(public readonly service: AppService) {
  }

  @Get()
  root(): string {
    return 'Hello World!';
  }

  @Get('/blocks')
  public blocks(): Block[] {
    return this.service.blockchain.chain;
  }

  @Get('/transactions')
  public transactions(): Transaction[] {
    return this.service.trxPool.transactions;
  }

  @Post('/mine')
  public mine(@Body() block: Block) {
    this.service.blockchain.addBlock(block);
    console.info('block added ...');
    this.service.server.sync();
    return this.blocks();
  }

  @Post('/transact')
  public transact(@Body() req: TransactionRequest) {
    let isValid = true;
    if (!req.recipient) isValid = false;
    if (!req.amount) isValid = false;
    if (req.amount <= 0) isValid = false;

    if (isValid) {
      const trx = this.service.wallet.createTransaction(req.recipient, req.amount, this.service.trxPool);
      this.service.server.broadcast(trx);
    } else {
      console.warn('Transaction request is not valid');
    }

    return this.transactions();
  }
}
