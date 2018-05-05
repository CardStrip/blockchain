import { INITIAL_BALANCE } from '../config';
import { ChainUtil } from '../chain.util';

export class Wallet {
    public balance = INITIAL_BALANCE;
    public keyPair: any;
    public publicKey: string;

    constructor() {
        this.keyPair = ChainUtil.GenKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    public toString() {
        return `wallet:
  publicKey : ${this.publicKey.toString()}
  balance   : ${this.balance}
`;
    }
}