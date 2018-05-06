import { Body, Controller, Get, Post } from '@nestjs/common';

import { Block } from './block';
import { Blockchain } from './blockchain';
import { BlockchainService } from './blockchain.service';
import { Transaction } from './transaction';
import { TransactionRequest } from './transaction/transaction.request';

@Controller()
export class BlockchainController {

  constructor(public readonly service: BlockchainService) {
  }

  @Get()
  root(): string {
    return 'Hello World!';
  }

  @Get('/publickey')
  public publickey() {
    return this.service.wallet.publicKey;
  }

  @Get('/blocks')
  public blocks(): Block[] {
    return this.service.blockchain.chain;
  }

  @Get('/transactions')
  public transactions(): Transaction[] {
    return this.service.trxPool.transactions;
  }

  @Get('/mine-transactions')
  public mineTransaction() {
    const block = this.service.miner.mine();
    // console.info(`New block added: ${block.toString()}`);

    return this.blocks();
  }

  @Post('/transact')
  public transact(@Body() req: TransactionRequest) {

    let isValid = true;
    if (!req.recipient) isValid = false;
    if (!req.amount) isValid = false;
    if (req.amount <= 0) isValid = false;

    if (isValid) {
      const trx = this.service.wallet.createTransaction(
        req.recipient,
        req.amount,
        this.service.blockchain,
        this.service.trxPool,
      );
      this.service.server.broadcast(trx);
    } else {
      console.warn('Transaction request is not valid');
    }

    return this.transactions();
  }

}
