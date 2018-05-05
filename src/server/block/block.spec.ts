import { Block } from './block';
import { DIFFICULITY } from '../config';

describe('Block', () => {
    let data: any, lastBlock: Block, block: Block;
    beforeEach(() => {
        data = 'bar';
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
    });
    it('should match `data` input', () => {
        expect(block.data).toEqual(data);
    });
    it('should match `lastHash` input', () => {
        expect(block.lastHash).toEqual(lastBlock.hash);
    });

    it('should generate a hash which matches the `DIFFICULITY`', () => {
        expect(block.hash.substring(0, block.difficulity)).toEqual('0'.repeat(block.difficulity));
    });

    it('should lower difficulty when blocks are mined too slow', () => {
        expect(Block.adjustDifficulity(block, block.timestamp + 360000)).toEqual(block.difficulity - 1);
    });

    it('should raise difficulty when blocks are mined too fast', () => {
        expect(Block.adjustDifficulity(block, block.timestamp + 1)).toEqual(block.difficulity + 1);
    });
});