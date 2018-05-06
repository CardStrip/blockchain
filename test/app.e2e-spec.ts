import request from 'supertest';
import { Test } from '@nestjs/testing';
import { BlockchainModule } from './../src/app/server/blockchain.module';
import { INestApplication } from '@nestjs/common';
import { Block } from '../src/app/server/block';
import { Transaction } from '../src/app/server/transaction';
import { TransactionRequest } from '../src/app/server/transaction/transaction.request';

describe('BlockchainController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [BlockchainModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET /', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/POST /transact /1', () => {
    const req = new TransactionRequest();
    req.recipient = 'ioi:address:1';
    req.amount = 51;

    return request(app.getHttpServer())
      .post('/transact')
      .send(req)
      .expect(201)
      .expect(res => {
        const transactions: Transaction[] = JSON.parse(res.text);
        expect(transactions.length).toEqual(1);
      });
  });

  it('/POST /transact /2', () => {
    const req = new TransactionRequest();
    req.recipient = 'ioi:address:2';
    req.amount = 99;

    return request(app.getHttpServer())
      .post('/transact')
      .send(req)
      .expect(201)
      .expect(res => {
        const transactions: Transaction[] = JSON.parse(res.text);
        expect(transactions.length).toEqual(1);
      });
  });

  it('/GET /mine-transactions', () => {
    return request(app.getHttpServer())
      .get('/mine-transactions')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(res => {
        const blocks: Block[] = res.body;
        expect(blocks.length).toEqual(2);
        expect(blocks[1].data.length).toEqual(2);
        expect(blocks[1].data[0].outputs[0].amount).toEqual(350);
        expect(blocks[1].data[0].outputs[1].amount).toEqual(51);
        expect(blocks[1].data[0].outputs[2].amount).toEqual(99);
        expect(blocks[1].data[1].outputs[0].amount).toEqual(50);
        // console.info(JSON.stringify(blocks[1].data, null, 2));
      });
  });

  it('/GET /blocks', () => {
    return request(app.getHttpServer())
      .get('/blocks')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(res => {
        const blocks: Block[] = res.body;
        expect(blocks.length).toEqual(2);
      });
  });

});
