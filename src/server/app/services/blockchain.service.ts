import { Injectable } from '@nestjs/common';
import { Blockchain } from '../../blockchain';

@Injectable()
export class BlockchainService {
  public blockchain: Blockchain;
  constructor() {
    this.blockchain = new Blockchain();
  }
}