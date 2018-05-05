import { Body } from '@nestjs/common';
import { Get, Controller, Post } from '@nestjs/common';
import { Blockchain } from '../blockchain';
import { Block } from '../block';
import { BlockchainService } from './services/blockchain.service';

@Controller()
export class AppController {
  public blockchain: Blockchain;

  constructor(private readonly service: BlockchainService) {
    this.blockchain = service.blockchain;
    console.log('bc => ' + this.blockchain);
  }

  @Get()
  root(): string {
    return 'Hello World!';
  }

  @Get('/blocks')
  public blocks(): Block[] {
    return this.blockchain.chain;
  }

  @Post('/mine')
  public mine(@Body() block: Block) {
    this.blockchain.addBlock(block);
    console.info('block added ...');
    return this.blocks();
  }
}
