import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Block } from './block';
import { Blockchain } from './blockchain';
import { BlockchainController } from './blockchain.controller';
import { AppService } from './blockchain.service';
import { Miner } from './miner';
import { TransactionPool } from './transaction';
import { Wallet } from './wallet';
import { MessageServer } from './websocket';

describe('BlockchainController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [BlockchainController],
      providers: [
        TransactionPool,
        Blockchain,
        MessageServer,
        Miner,
        Wallet,
        AppService,
      ],
    }).compile();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const blockchainController = app.get<BlockchainController>(BlockchainController);
      expect(blockchainController.root()).toBe('Hello World!');
    });
  });

  describe('blocks', () => {
    it('should return the genesis block', () => {
      const blockchainController = app.get<BlockchainController>(BlockchainController);
      expect(blockchainController.blocks()).toEqual(blockchainController.service.blockchain.chain);
    });
  });

  // describe('mine', () => {
  //   it('should return the blocks', () => {
  //     const blockchain = app.get<AppService>(AppService).blockchain;
  //     const block = Block.mineBlock(blockchain.getLastBlock(), 'foobar1');
  //     const blockchainController = app.get<BlockchainController>(BlockchainController);
  //     const chain = blockchainController.mine(block);
  //     expect(chain).toEqual(blockchainController.service.blockchain.chain);
  //   });
  // });

});
