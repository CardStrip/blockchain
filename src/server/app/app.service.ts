import { Injectable } from '@nestjs/common';
import { Blockchain } from '../blockchain';
import { P2pServer } from '../p2p-server';

@Injectable()
export class AppService {
  public blockchain: Blockchain;
  public server: P2pServer;
  constructor() {
    this.blockchain = new Blockchain();
    this.server = new P2pServer(this.blockchain);
  }
}