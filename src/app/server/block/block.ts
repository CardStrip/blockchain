import { DIFFICULITY, MINE_RATE } from '../config';
import { ChainUtil } from '../chain.util';

export class Block {

    public static genesis() {
        return new Block(new Date(2018, 5, 1, 0, 1, 30).getTime(), '-----', 'f1r57-h45h', [], 0, DIFFICULITY);
    }

    public static mineBlock(lastBlock: Block, data: any) {
        let nonce = 0;
        let hash: string;
        let timestamp = Date.now();
        let { difficulity } = lastBlock;
        const lastHash = lastBlock.hash;

        do {
            nonce++;
            timestamp = Date.now();
            difficulity = Block.adjustDifficulity(lastBlock, timestamp);
            hash = Block.hash(timestamp, lastHash, data, nonce, difficulity);
        } while (hash.substring(0, difficulity) !== '0'.repeat(difficulity));

        return new Block(timestamp, lastHash, hash, data, nonce, difficulity);
    }

    public static hash(timestamp: number, lastHash: string, data: any, nonce: number, difficulity: number) {
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulity}`).toString();
    }

    public static blockHash(block: Block) {
        const { timestamp, lastHash, data, nonce, difficulity} = block;
        return Block.hash(timestamp, lastHash, data, nonce, difficulity);
    }

    public static adjustDifficulity(lastBlock: Block, currentTime: number): number {
        let { difficulity } = lastBlock;
        difficulity = lastBlock.timestamp + MINE_RATE > currentTime ? difficulity + 1 : difficulity - 1 ;
        return difficulity;
    }
    constructor(
        public timestamp: number,
        public lastHash: string,
        public hash: string,
        public data: any,
        public nonce: number,
        public difficulity: number = DIFFICULITY ) {
    }

    public toString() {
        return `block:
  timestamp  : ${this.timestamp}
  Last Hash  : ${this.lastHash.substring(0, 10)}
  Hash       : ${this.hash.substring(0, 10)}
  data       : ${this.data}
  nonce      : ${this.nonce}
  difficulity: ${this.difficulity}
 `;
    }
}
