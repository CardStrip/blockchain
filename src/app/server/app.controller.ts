import { Body } from '@nestjs/common';
import { Get, Controller, Post } from '@nestjs/common';
import { Blockchain } from './blockchain';
import { Block } from './block';
import { AppService } from './app.service';

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

  @Post('/mine')
  public mine(@Body() block: Block) {
    this.service.blockchain.addBlock(block);
    console.info('block added ...');
    this.service.server.sync();
    return this.blocks();
  }
}
