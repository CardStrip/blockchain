import { INITIAL_BALANCE } from '../config';
import { ChainUtil } from '../chain.util';

export class Wallet {
    public balance = INITIAL_BALANCE;
    public keyPair: any;
    public publicKey: string;

    constructor() {
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    public sign(dataHash: string): string {
        return this.keyPair.sign(dataHash);
    }

    public toString() {
        return `wallet:
  publicKey : ${this.publicKey.toString()}
  balance   : ${this.balance}
`;
    }

}