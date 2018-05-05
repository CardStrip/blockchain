import { SHA256 } from 'crypto-js';

export class Block {

    public static genesis() {
        return new Block(new Date(2018, 5, 1, 0, 1, 30).getUTCSeconds(), '-----', 'f1r57-h45h', []);
    }

    public static mineBlock(lastBlock: Block, data: any) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp, lastHash, data);
        return new Block(timestamp, lastHash, hash, data);
    }

    public static hash(timestamp: number, lastHash: string, data: any) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

    public static blockHash(block: Block) {
        const { timestamp, lastHash, data} = block;
        return Block.hash(timestamp, lastHash, data);
    }

    constructor(
        public timestamp: number,
        public lastHash: string,
        public hash: string,
        public data: any ) {
    }

    public toString() {
        return `block:
  timestamp : ${this.timestamp}
  Last Hash : ${this.lastHash.substring(0, 10)}
  Hash      : ${this.hash.substring(0, 10)}
  data      : ${this.data}
 `;
    }
}
