import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppController } from './app.controller';
import { Blockchain } from '../blockchain';
import { Block } from '../block';
import { BlockchainService } from './services/blockchain.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [BlockchainService],
    }).compile();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.root()).toBe('Hello World!');
    });
  });

  describe('blocks', () => {
    it('should return the genesis block', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.blocks()).toEqual(appController.blockchain.chain);
    });
  });

  describe('mine', () => {
    it('should return the blocks', () => {
      const blockchain = app.get<BlockchainService>(BlockchainService).blockchain;
      const block = Block.mineBlock(blockchain.getLastBlock(), 'foobar1');
      const appController = app.get<AppController>(AppController);
      const chain = appController.mine(block);
      expect(chain).toEqual(appController.blockchain.chain);
    });
  });
});
